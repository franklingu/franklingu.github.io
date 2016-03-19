---
layout: blog_base
title: Set up php project with composer on CentOS 7
category: programming
tag: Python
meta_desc: Set up php (5.5 or 5.6) project with composer on CentOS 7 using Flarum as an example.
---

> PHP is the best language.  -- Annoymous

To be honest, I am still not very sure when some programmer tells me that "PHP is the best language" whether he is serious or just making fun. But anyway since I learned about programming, I did not have a chance of working with PHP seriously and recently I got assigned to set up my company's forum using a very new Forum system developed on top of PHP -- [Flarum](http://flarum.org/)--therefore I had the chance of working with PHP.

There are quite some incompatible changes in PHP 7 and we can also see the performance boost in the release of PHP 7 [comparison](https://www.besthostnews.com/php-5-6-vs-hhvm-3-7-vs-php-7-benchmarks/). But at the time of my writing, Flarum is only supported on PHP 5.6 and 5.7 so this post will talk about PHP 5.6 installation and setup only.

So tools and languages we need: PHP 5.6, Node.js 4+(5+ OK as well), Nginx 1.6+, MySQL 5.6+. After getting a basic idea of this, let's start.

CentOS is a great OS but it does not come with a big package repo--so we need to extend to locate our required packages:

~~~
wget http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
wget http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
rpm -Uvh remi-release-7*.rpm epel-release-7*.rpm
~~~

So the command above will install fedora project's repo and php's repo in your system. And for remi, you need to modify repo's settings to choose which version of PHP you would like to install:

~~~
[remi]
name=Les RPM de remi pour Enterprise Linux 6 - $basearch
#baseurl=http://rpms.famillecollet.com/enterprise/6/remi/$basearch/
mirrorlist=http://rpms.famillecollet.com/enterprise/6/remi/mirror
enabled=1   # make sure this is enabled so that remi repos will be queried by CentOS
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-remi
[remi-php56]
name=Les RPM de remi de PHP 5.6 pour Enterprise Linux 6 - $basearch
#baseurl=http://rpms.famillecollet.com/enterprise/6/php56/$basearch/
mirrorlist=http://rpms.famillecollet.com/enterprise/6/php56/mirror
# WARNING: If you enable this repository, you must also enable "remi"
enabled=1  # and we are using PHP 5.6 in this case
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-remi
~~~

Now, run `sudo yum update` and `sudo yum install nginx php php-cli php-mysql`--you should have nginx and php set up already.

Now let's move to Node.js:

~~~
curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
# for this command, you may want to change it to curl --silent --location https://rpm.nodesource.com/setup_4.x | sudo bash -
# for sudo access
~~~

Now you should be able to install Node.js 4+ with `sudo yum install nodejs`.

Starting from CentOS 7, MariaDB has replaced MySQL in its repo. Although MariaDB is supposed to be able to replace of a lot of MySQL's functionalities, it is still better to install MySQL(until Oracle starts to charge for MySQL-community?)

~~~
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm
~~~

And you install MySQL with `sudo yum install mysql-server` should do.

In the case of Flarum, there are some development tools such as npm, Gulp and composer needed for managing dependencies and run tasks. Since npm comes with Nodejs and now we need to care about composer and Gulp.
