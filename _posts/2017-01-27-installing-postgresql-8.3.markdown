---
layout: blog_base
title: Install Postgresql 8.3 on Ubuntu
category: reading
tag: reading
meta_desc: how to install postgresql 8.3 on Ubuntu 12.04, 14.04 and 16.04
---

One of the projects that I am recently working on involves postgres and since it is an old project, the production server version is 8.3. Although I am pretty sure I did not use anything fancy that is added in 9.*, it is better to test in a exact situation as production server before we apply any upgrade(preparing for the update take a lot of care and effort because if something went wrong, even recovery is not an easy step in most cases. And however bad things may happen could happen.)

Therefore I went ahead to install Postgresql 8.3. Since I have tested everything on Postgresql 9.1, I created a simple docker container to avoid multiple postgres on my working machine.

To install 8.3, first I checked [Official installation of postgres on ubuntu](https://www.postgresql.org/download/linux/ubuntu/) and sadly there is not support of 8.* on the official apt repository any more. So this leaves only one option: install from source. There is actually [great documentation about installing from source](https://www.postgresql.org/docs/8.3/static/installation.html). However, I followed step by step and ended up this error:

~~~
creating directory p01/pgsql/data ... ok
creating subdirectories ... ok
selecting default max_connections ... 100
selecting default shared_buffers/max_fsm_pages ... 24MB/153600
creating configuration files ... ok
creating template1 database in p01/pgsql/data/base/1 ... ok
initializing pg_authid ... FATAL:  wrong number of index expressions
STATEMENT:  CREATE TRIGGER pg_sync_pg_database   AFTER INSERT OR UPDATE OR DELETE ON

pg_database   FOR EACH STATEMENT EXECUTE PROCEDURE flatfile_update_trigger();

child process exited with exit code 1
initdb: removing data directory "p01/pgsql/data"
~~~

After a few searches, seems this could be easily fixed if I want to install 9.* cause in 9.* there is no error like this any more but I have to stick to 8.3. I changed the short version of installation to this:

~~~
apt-get install -y build-essential libreadline-dev zlib1g-dev flex bison libxml2-dev libxslt-dev libssl-dev
apt-get install -y clang
./configure CFLAGS="-O1" CC=clang
make
su root
make install
adduser postgres
mkdir /usr/local/pgsql/data
chown postgres /usr/local/pgsql/data
su - postgres
/usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data
/usr/local/pgsql/bin/postgres -D /usr/local/pgsql/data >logfile 2>&1 &
/usr/local/pgsql/bin/createdb test
/usr/local/pgsql/bin/psql test
~~~

So now inidb should be fine. And if typing commands like this is a pain, you can edit '/etc/bash.bashrc' by adding:

~~~
LD_LIBRARY_PATH=/usr/local/pgsql/lib:$LD_LIBRARY_PATH
export LD_LIBRARY_PATH

export PATH=/usr/local/pgsql/bin:$PATH
~~~

Happy coding!

References:

1. [SO question about initdb failure](http://stackoverflow.com/questions/25583549/initdb-initializing-pg-authid-fatal-wrong-number-of-index-expressions)
2. [SO question add to path for all users](http://askubuntu.com/questions/24937/how-do-i-set-path-variables-for-all-users-on-a-server)
