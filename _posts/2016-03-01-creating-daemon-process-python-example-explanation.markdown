---
layout: blog_base
title: Creating daemon process Python example explanation
category: programming
tag: Python
meta_desc: Explanation for the Python example for creating daemon process in Unix based systems
excerpt_separator: <!--more-->
---

A daemon is a long-running background process that answers requests for services. It is used quite often in programming in various cases. An ideal daemon process should satisfy following conditions(Taken from description about daemon processes in [PEP 3143](https://www.python.org/dev/peps/pep-3143/#correct-daemon-behaviour)):
<!--more-->

>
* Close all open file descriptors.
* Change current working directory.
* Reset the file access creation mask.
* Run in the background.
* Disassociate from process group.
* Ignore terminal I/O signals.
* Disassociate from control terminal.
* Don't reacquire a control terminal.
* Correctly handle the following circumstances:
  * Started by System V init process.
  * Daemon termination by SIGTERM signal.
  * Children generate SIGCLD signal.

Creating a daemon process is used a lot and there is one more reason I want to talk about it here: there is a very famous double fork technique when it comes to creating a daemon process in Unix based systems, A complete code example is like [A simple unix/linux daemon in Python](http://www.jejik.com/articles/2007/02/a_simple_unix_linux_daemon_in_python/) and the core part of doing a double fork is as follow:

~~~python
def daemonize(self):
    """
    do the UNIX double-fork magic, see Stevens' "Advanced
    Programming in the UNIX Environment" for details (ISBN 0201563177)
    http://www.erlenstar.demon.co.uk/unix/faq_2.html#SEC16
    """
    try:
            pid = os.fork()
            if pid > 0:
                    # exit first parent
                    sys.exit(0)
    except OSError, e:
            sys.stderr.write("fork #1 failed: %d (%s)\n" % (e.errno, e.strerror))
            sys.exit(1)

    # decouple from parent environment
    os.chdir("/")
    os.setsid()
    os.umask(0)

    # do second fork
    try:
            pid = os.fork()
            if pid > 0:
                    # exit from second parent
                    sys.exit(0)
    except OSError, e:
            sys.stderr.write("fork #2 failed: %d (%s)\n" % (e.errno, e.strerror))
            sys.exit(1)

    # redirect standard file descriptors
    sys.stdout.flush()
    sys.stderr.flush()
    si = file(self.stdin, 'r')
    so = file(self.stdout, 'a+')
    se = file(self.stderr, 'a+', 0)
    os.dup2(si.fileno(), sys.stdin.fileno())
    os.dup2(so.fileno(), sys.stdout.fileno())
    os.dup2(se.fileno(), sys.stderr.fileno())

    # write pidfile
    atexit.register(self.delpid)
    pid = str(os.getpid())
    file(self.pidfile,'w+').write("%s\n" % pid)
~~~

As you can see clearly, there are 2 fork system calls. There are many good discussions on [StackOverflow](http://stackoverflow.com/questions/881388/what-is-the-reason-for-performing-a-double-fork-when-creating-a-daemon) regarding this issue as well. I will just explain the whole thing based on my own understanding after reading through those good answers.

Let us say you launch this Python program in a shell. When you fork this launched Python process, many environmental settings are replicated to forked_1 as well. One thing in particular is that forked_1 is still associated with the shell you are working in now and therefore we should "disassociate" it with the terminal.

So we killed the parent process and call setsid for forked_1. Well, notice that we have to kill the parent here to make forked_1 become an "orphan" so that it will be monitored by init process now. After setsid, it will be in its own session and process group--therefore it will be its own session's leader(session_id == process_id). At this moment, we probably want to reset umask, change conrrent directory, ignore those terminal signals(which is omitted in the code snippet above).

So now forked_1 has become decoupled from parent process and does not associate with any termial. However, a session leader can take control of a terminal later if a new terminal is opened and our decouple is a session leader. Now we fork again, this time the forked_2's process_id is guaranted to be different from session_id--which is equal to decouple' process_id already. So forked_2 is not a session leader. Now we kill forked_2's parent and forked_2 will be monitored by init process. We are finally done.

In fact, this is a bit paranoid as some people suggested but it is safe--so you can see this technique is used a lot when creating a daemon.
