---
layout: blog_base
title: Set up and run CppCMS on CentOS
category: programming
tag: programming, C++, CppCMS
meta_desc: Guide about how to install and configure simple CppCMS on CentOS.
---

What is CppCMS? CppCMS is a Free High Performance Web Development Framework (not a CMS) aimed at Rapid Web Application Development. It differs from most other web development frameworks like: Python Django, Java Servlets in the following ways:

1. It is designed and tuned to handle extremely high loads.
2. It uses modern C++ as the primary development language in order to achieve the first goal.
3. It is designed for developing both Web Sites and Web Services.

It is available under open source LGPLv3 license and alternative Commercial License for users who needs an alternative license for proprietary software development.

As I have mentioned in [the post about C++ web development](http://franklingu.github.io/programming/2015/12/21/C++-CGI-setup-on-CentOS/), C++ is definitely not the first choice that is going to come to our minds when it comes to web development. However, if you do value efficiency much, C++ is definitely the great choice(but think again before you jump to the conclusion that you need great efficiency. All programs should be fast but optimizations can be done in many levels. Reason carefully and persuade yourself that Ruby on Rails or Django is not going to meet the requirements even though the development speed will be so much boosted).

Personally I am trying out CppCMS just for fun and after playing with it, I have decided that I will not use C++ for web development because of its un-friendliness with developers. But anyway, let's get started:

First, all the dependencies:

```
yum install cmake gcc-c++ gcc make zlib-devel pcre-devel libicu-devel libgcrypt-devel
```

Then let's download the source and build it:

```
# download source from http://sourceforge.net/projects/cppcms/files/
tar -xjf cppcms-1.0.5.tar.bz2  # or the version you have chosen
cd cppcms-1.0.5
mkdir build
cd build
cmake .. # different build options could be applied here, see http://cppcms.com/wikipp/en/page/cppcms_1x_build
make
make test
make install
```

Now you have CppCMS installed already. There is just one more thing though: adding link to CppCMS library for g++ build. Check to see if libcppcms.so is indeed in the location: "/usr/local/lib"(the default installation folder for lib files on linux based OSs).

```
cd /etc/ld.so.conf.d/
echo "/usr/local/lib" >> cppcms.conf
ldconfig  # reload
```

Now you are good to create your [hello_world CppCMS application](http://cppcms.com/wikipp/en/page/cppcms_1x_tut_hello).

Reference:

* [CppCMS build instructions](http://cppcms.com/wikipp/en/page/cppcms_1x_build)
* [CppCMS trouble shooting guide](http://cppcms.com/wikipp/en/page/cppcms_1x_build_troubleshooting#My.sample.application.does.not.find.the.shared.object..code.libcppcms.so..code..when.I.try.to.run.it.)
