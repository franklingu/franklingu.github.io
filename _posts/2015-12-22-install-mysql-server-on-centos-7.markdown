---
layout: blog_base
title: Install MySQL Server on CentOS 7
category: programming
tag: programming, CentOS, MySQL
meta_desc: Guide about how to install MySQL(and replace the default MariaDB) server on CentOS 7.
---

Since CentOS 7, MySQL has been replaced with MariaDB as the default "official" database management software. A quick search on Google yeilded a few posts and all of them are about MariaDB. Well, I cannot blame those authors anyway since if you did not install MySQL rpm and you try typing "yum install mysql-server" on CentOS 7, you do not see any error report of "package not found" but instead yum will return MariaDB as the result. Since MySQL was purchased by Orable, there is an increasing trend for developers to switch to PostgreSQL and MariaDB but still there are many users sticking to MySQL now. So let's see how to install a real MySQL on CentOS 7.

Add MySQL rpm:

```
yum install http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
yum update
```

Install MySQL server:

```
yum install mysql-community-server
```

Start MySQL server and check its version:

```
systemctl start mysqld
systemctl status mysqld  # checking the runing status of mysql server
mysqld --version  # return version information of mysql server
```

References:

* [How to install MySQL on CentOS 7](https://www.linode.com/docs/databases/mysql/how-to-install-mysql-on-centos-7)
* [Install MySQL 5.6 on CentOS 7](http://serverlab.org/view/8/How-to-install-latest-mysql-5.6-on-CentOS7)
