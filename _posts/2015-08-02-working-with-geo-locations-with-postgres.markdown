---
layout: blog_base
title: PostGIS, working with spacial data in Postgres easily
category: development
tag: programming, postgres, psql, postgis
meta_desc: PostGIS installation guide on linux
---

Personally I love Postgres and I think many other people share this passion. It is reliable and reasonably fast and it recently gets
new feature for document storing mechanism. So I will choose PSQL whenever possible. When it comes to spacial data, however,
we will need an extension called PostGIS.

> PostGIS is an open source, freely available, and fairly OGC compliant spatial database extender for the PostgreSQL Database Management System. In a nutshell it adds spatial functions such as distance, area, union, intersection, and specialty geometry data types to the database. PostGIS is very similar in functionality to SQL Server 2008 Spatial support, ESRI ArcSDE, Oracle Spatial, and DB2 spatial extender.

However, I encountered a bit of trouble when installing this extension for psql today and I want to share problems I experienced
and hope that this can save others from going through same trouble :P

Well, first of all, you have to make sure "postgresql-server-dev-9.4"(the version number maybe different for your machine)
is installed. So simply run ```apt-get install postgresql-9.4 postgresql-server-dev-9.4``` for postgresql complete setup
for PostGIS.

Then it comes to the real part: installation of PostGIS. According to this [link](http://stackoverflow.com/questions/4629796/issues-installing-postgis) here, apparently there is some package hosting
for this. I did not try this because I want more control.

There are some required packages and libraries for you to install first [ref](http://postgis.net/docs/postgis_installation.html#install_requirements) -- actually I overlooked this section and
go ahead with installation and installed all of them in the reverse way: try and error, fix and rerun and error and loop
until done :(.

For example: [GEOS](http://trac.osgeo.org/geos/)

{% highlight shell %}
wget http://download.osgeo.org/geos/geos-3.4.2.tar.bz2
tar xjf geos-3.4.2.tar.bz2
cd geos-3.4.2/
./configure
make
sudo make install
cd ..
{% endhighlight %}

Well, this library is still OK and does not take centuries to install. Proj.4 takes not too long too but when it comes to
GDAL, maybe you should try making some coffee for yourself and after finishing one cup and then come back. (libxml2 and json-c can be installed via apt-get easily "sudo apt-get install libjson0 libjson0-dev" "sudo apt-get install libxml-dev")

Uh, installation done but that is only the beginning of all headaches. I forgot my database password! So I searched online
and found [this](http://stackoverflow.com/questions/922804/is-there-a-way-to-break-into-a-postgresql-database-if-you-forgot-the-password). However, at least on ubuntu, postgresql by default have versions so therefore the path should be something like "
/var/lib/postgresql/9.4/main/" -- which you can find out by "echo $PGDATA". And then here comes another complication: at least
in psql-9.4 pg_hub.conf is not in PGDATA folder by default any more. Then I searched and got it "/etc/postgresql/9.4/main/". After modified the conf local postgres from md5 to trust, I have to restart postgres server
for the change to take effects.

Then what you need to do is just psql into any db with -U posgres and create extension postgis and you are ready to go.

(if during the process of creating extension you see /usr/local/lib/libgdal.so~~ not loaded or something like that,
see [this](http://stackoverflow.com/questions/9104224/geodjango-gdal-library-giving-error) and just try ```sudo ldconfig``` to config library path)

Happy coding :P
