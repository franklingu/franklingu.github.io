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

{% highlight shell %}
yum group list
yum group install "Development Tools"
{% endhighlight %}

You may want to just configure firewall and SELinux settings here for simplicity so that you will not just get "Permission denied" message without any clue why.

{% highlight shell %}
firewall-cmd --permanent --zone=public --add-service=http  # allow http
firewall-cmd --permanent --zone=public --add-service=https # allow https
firewall-cmd --reload
getenforce  # check enforce settings
setenforce permissive  # set to grant permissions
# if you want to disable SELinux completely, 'cat /etc/sysconfig/selinux' and edit the settings
{% endhighlight %}

There are basically 2 choices for setting up web server to serve CGI scripts. Apache and httpd support execution of CGI scripts by default and you can just simply enable "+ExecCGI" option. Or you can try Nginx, which does not support CGI execution but supports FastCGI. So in this tutorial we will be exploring the easier option and we will be install htttpd to server CGI scripts.

Install httpd with the command:

{% highlight shell %}
yum install httpd
systemctl start httpd
# Go to localhost now and you should see the default index page saying "Testing 1 2 3"
{% endhighlight %}

Navigate to httpd configuration folder and edit httpd.conf, and add the following lines

{% highlight shell %}
<Directory "/var/www/cgi-bin">
   AllowOverride None
   Options +ExecCGI
   Order allow,deny
   Allow from all
</Directory>

<Directory "/var/www/cgi-bin">
Options All
</Directory>
{% endhighlight %}

Restart httpd server with <code>systemctl reload httpd</code>. Now navigate to /var/www/cgi-bin/ folder and create start.cpp like this:

{% highlight cpp %}
#include <iostream>
using namespace std;

int main ()
{
    // this line is the magic--telling client that the response content type is html
    cout << "Content-type:text/html\r\n\r\n";
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
{% endhighlight %}

Compile with command <code>g++ -o start.cgi start.cpp</code> and make it executable with <code>chmod +x start.cgi</code>. Then <code>curl localhost/cgi-bin/start.cgi</code> to see the response.

*Note: CGI scripts are any executable scripts. For example you can just create a Perl script or a Python script and print the html response you want to see*

References:

* [CGI programming in C](http://forum.codecall.net/topic/72818-cgi-programming-in-c/)
* [C++ web programming](http://www.tutorialspoint.com/cplusplus/cpp_web_programming.htm)
* [Nginx on CentOS](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-centos-7)
* [Serving CGI scripts on CentOS](https://www.howtoforge.com/serving-cgi-scripts-with-nginx-on-centos-6.0-p2)
* [FCGI Wrap on Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/fcgiwrap/)
