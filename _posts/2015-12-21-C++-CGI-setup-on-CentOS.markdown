---
layout: blog_base
title: C++ web development environment setup on CentOS
category: programming
tag: programming, C++, CGI
meta_desc: Guide about how to set up simple C++ web development environment with CGI on CentOS.
---

Web programming essentially is about text processing--at least it was mainly about getting requests in the form of text and then response with text/html as well. Of course later some more file formats are supported and currently we even have just JSON based reponses--the main stream(like JSON, html, JavaScript and CSS) is still text based. For processing text, scripting languages like Perl, PHP, Python and Ruby are great and therefore we see popular web development technologies are mostly based on these languages(Now we have Java, Scala, Go, Erlang and many more choices as well though). So spending time figuring out how C++ is going to do this job just does not seem to be right.

What do we use C++ for? System and application programmings. Google used to have a lot of C++ code for its search engine because it is just so performance critical. Facebook grew to a huge scale and found that PHP is on longer serving them well because of slowness and typelessness. Then they have Hack(OCaml package for setting types and compiled to C++ for speed). But for most web development, we do not need C++ for performance enhancement. But by exploring C++ in web development, we can understand fundamentals of web development better--and that is the main purpose of this tutorial.

Before we start, you may want to first get a good look at [HTTP and CGI](http://www.garshol.priv.no/download/text/http-tut.html)

The tutorial is based on CentOS 7. If you do not have one, you can use VirtualBox to install it in a virtual machine and you can even explore use of Vagrant.

First, let us just check and install essential developments tools:

```
yum group list
yum group install "Development Tools"
```

Install and start Nginx:

```
yum install epel-release
yum install nginx
systemctl start nginx
```

You may want to just configure firewall and SELinux settings here for simplicity so that you will not just get "Permission denied" message without any clue why.

```
firewall-cmd --permanent --zone=public --add-service=http  # allow http
firewall-cmd --permanent --zone=public --add-service=https # allow https
firewall-cmd --reload
getenforce  # check enforce settings
setenforce permissive  # set to grant permissions
# if you want to disable SELinux completely, 'cat /etc/sysconfig/selinux' and edit the settings
```

Then we will install fcgiwrap--a simple wrapper of FastCGI for CGI scripts.

```
yum install fcgi-devel
cd /usr/local/src/
git clone git://github.com/gnosek/fcgiwrap.git
cd fcgiwrap
autoreconf -i
./configure
make
make install
```

Now let's create a script for running fcgiwrap at "/etc/init.d/fcgiwrap"

```
#!/usr/bin/perl

use strict;
use warnings FATAL => qw( all );

use IO::Socket::UNIX;

my $bin_path = '/usr/local/bin/fcgiwrap';
my $socket_path = $ARGV[0] || '/tmp/cgi.sock';  # you can change the location by yourself
my $num_children = $ARGV[1] || 1;

close STDIN;

unlink $socket_path;
my $socket = IO::Socket::UNIX->new(
    Local => $socket_path,
    Listen => 100,
);

die "Cannot create socket at $socket_path: $!\n" unless $socket;

for (1 .. $num_children) {
    my $pid = fork;
    die "Cannot fork: $!" unless defined $pid;
    next if $pid;

    exec $bin_path;
    die "Failed to exec $bin_path: $!\n";
}
```

And run <code>chmod +x /etc/init.d/fcgiwrap & /etc/init.d/fcgiwrap</code> to run the script. Now let's configure Nginx so that it will point to /tmp/cgi.sock(or your own defined location above) by "vim /etc/nginx/nginx.conf"

```
server {
   # let us say root is at /var/www
[...]
   location /cgi-bin/*\.cgi {
     # Disable gzip (it makes scripts feel slower since they have to complete
     # before getting gzipped)
     gzip off;
     # Set the root to /usr/lib (inside this location this means that we are
     # giving access to the files under /usr/lib/cgi-bin)
     root  /var/www/www.example.com;
     # Fastcgi socket
     fastcgi_pass  unix:/tmp/cgi.sock;
     # Fastcgi parameters, include the standard ones
     include /etc/nginx/fastcgi_params;
     # Adjust non standard parameters (SCRIPT_FILENAME)
     fastcgi_param SCRIPT_FILENAME  $document_root$fastcgi_script_name;
   }
[...]
}
```

Reload Nginx with <code>systemctl restart nginx</code>.

Now navigate to /var/www/cgi-bin/ folder and create start.cpp like this:

```
#include <iostream>
using namespace std;
 
int main ()
{
    cout << "Content-type:text/html\r\n\r\n";  // this line is the magic--telling client that the response content type is html
    cout << "<html>\n";
    cout << "<head>\n";
    cout << "<title>Hello World - First CGI Program</title>\n";
    cout << "</head>\n";
    cout << "<body>\n";
    cout << "<h2>Hello World! This is my first CGI program</h2>\n";
    cout << "</body>\n";
    cout << "</html>\n";
   
    return 0;
}
```

Compile with command <code>g++ -o start.cgi start.cpp</code>. Then <code>curl localhost/cgi-bin/start.cgi</code> to see the response.

References:
* [CGI programming in C](http://forum.codecall.net/topic/72818-cgi-programming-in-c/)
* [C++ web programming](http://www.tutorialspoint.com/cplusplus/cpp_web_programming.htm)
* [Nginx on CentOS](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-centos-7)
* [Serving CGI scripts on CentOS](https://www.howtoforge.com/serving-cgi-scripts-with-nginx-on-centos-6.0-p2)
* [FCGI Wrap on Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/fcgiwrap/)

