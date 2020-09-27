---
layout: blog_base
title: Weird bug that you cannot even debug in Python
category: programming
tag: python
meta_desc: Weird bug that you cannot even debug in Python--a bug causing max recursion error, and further causing pdb, ipdb and pudb could not be used anymore--digging into pdb and sys.settrace
---

Recently I took over an existing project. There is some newly added feature and I started to debug using ipdb. So everything went well--I input "\n" to see what happens when executed to next line. But then all of a sudden this command does not work anymore--seems the debugger just breaks and all of my subsequent breakpoints did not pause the program execution.

So I thought maybe it is a bug in ipdb. Then I opened PyCharm and this time the debugger did not work at all. I tried pudb and pdb, nothing works--the debugger just fail at the certain step.

So I traced the program manually and found there is a misuse of `__getattribute__`. I simplify the code to the following:
~~~python
class TestAttribute(object):
    """docstring for TestAttribute"""
    def __init__(self, is_testing=False):
        super(TestAttribute, self).__init__()
        self.is_testing = is_testing

    def __getattribute__(self, name):
        # print(name)
        try:
            # the line below will trigger the recursion error
            if self.is_testing:
                name = name.upper()
            return super(TestAttribute, self).__getattribute__(name)
        except AttributeError:
            return None
        except Exception:
            # this line is added by me to see the output
            import traceback; traceback.print_exc();
            return None

    def __getitem__(self, name):
        return self.__getattribute__(name)

    def __setitem__(self, name, val):
        return self.__setattr__(name, val)

    def __setattr__(self, name, val):
        # so this func will be called in __init__ and will
        # enter __getattribute__
        if self.is_testing:
            name = name.lower()
        super(TestAttribute, self).__setattr__(name, val)


if __name__ == '__main__':
    ttt = TestAttribute()
    import pdb; pdb.set_trace()
    ttt.k = 1
    print('test done')
    print('test done again')
    print('test done again')
    print('test done again')
~~~

Output as below:

~~~
Traceback (most recent call last):
  File "test_getattribute.py", line 10, in __getattribute__
Traceback (most recent call last):
  File "test_getattribute.py", line 10, in __getattribute__
    if self.is_testing:
  File "test_getattribute.py", line 16, in __getattribute__
    import traceback; traceback.print_exc();
  File "/usr/lib/python2.7/traceback.py", line 232, in print_exc
    print_exception(etype, value, tb, limit, file)
  File "/usr/lib/python2.7/traceback.py", line 125, in print_exception
    print_tb(tb, limit, file)
  File "/usr/lib/python2.7/traceback.py", line 69, in print_tb
    line = linecache.getline(filename, lineno, f.f_globals)
  File "/home/jgu/repos/.venv/lib/python2.7/linecache.py", line 14, in getline
    lines = getlines(filename, module_globals)
  File "/home/jgu/repos/.venv/lib/python2.7/linecache.py", line 40, in getlines
    return updatecache(filename, module_globals)
RuntimeError: maximum recursion depth exceeded
> /home/jgu/repos/dat_cs/test_getattribute.py(34)<module>()
-> ttt.k = 1
(Pdb) n
Traceback (most recent call last):
  File "test_getattribute.py", line 10, in __getattribute__
    if self.is_testing:
  File "test_getattribute.py", line 7, in __getattribute__
    def __getattribute__(self, name):
  File "/usr/lib/python2.7/bdb.py", line 50, in trace_dispatch
    return self.dispatch_call(frame, arg)
  File "/usr/lib/python2.7/bdb.py", line 76, in dispatch_call
    if not (self.stop_here(frame) or self.break_anywhere(frame)):
  File "/usr/lib/python2.7/bdb.py", line 147, in break_anywhere
    return self.canonic(frame.f_code.co_filename) in self.breaks
  File "/usr/lib/python2.7/bdb.py", line 29, in canonic
    if filename == "<" + filename[1:-1] + ">":
RuntimeError: maximum recursion depth exceeded in cmp
test done
test done again
test done again
test done again
~~~

So the normal behaviour of pdb should be: after I input "n", it should go to next line and wait for my further instruction. However, in this example, the program did not pause at next line but instead continued the execution until its end.

As you can see from the output, there is RuntimeError saying max recursion depth exceeded. This happens because `__getattribute__` is used whenever some lookup happens, so `self.is_testing` will invoke its `__getattribute__`. And notice that the last line in max recursion error is in bdb--file in which there is a base class for pdb. And if we dig deeper, we find that it uses `sys.settrace` to debug--in fact that is what is `sys.settrace` for. And if any exception happens in tracefunc, [sys.settrace](https://docs.python.org/2/library/sys.html#sys.settrace) will stop working (Any exception that propagates out of the trace function disables it). Therefore pdb will not work anymore as `sys.settrace` stopped working and tracefunc will not be invoked anymore.
