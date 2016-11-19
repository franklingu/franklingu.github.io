---
layout: blog_base
title: use psql to create database user with readonly access to db
category: programming
tag: postgres
meta_desc: use psql to create database user with readonly access to a postgres database
---

As recently I am working with some structured relational data, I choose to use postgres as the database. And after cleaning the data and move it into database, some colleague came and asked for the access to the data. So if I choose to trust him, I can just give him my database super user and password and ask him to use python interface program provided by me. However, what if he decided to connect to my db and decided to `DROP DATABASE`? Trust is cheap. Let's setup restriction.

~~~sql
GRANT CONNECT ON DATABASE ${DB_NAME} TO ${ROLE};
GRANT USAGE ON SCHEMA ${SCHEMA} TO ${ROLE};
GRANT SELECT ON ALL TABLES IN SCHEMA ${SCHEMA} TO ${ROLE};
GRANT SELECT ON ALL SEQUENCES IN SCHEMA ${SCHEMA} TO ${ROLE};
ALTER DEFAULT PRIVILEGES IN SCHEMA ${SCHEMA} GRANT SELECT ON TABLES TO ${ROLE};
ALTER DEFAULT PRIVILEGES IN SCHEMA ${SCHEMA} GRANT SELECT ON SEQUENCES TO ${ROLE};
~~~

Some simple explanation:
So user needs to be able to connect to the database first.
Usually the schema should be public--which means database in this schema is publicly available.
Then grant SELECT on all tables and sequences in the schema and give user default privilege of SELECT as well.

Since user can only connect to that database, therefore he/she is able to READ from that database only. You can check the command results with `\l`.

References:
1. [Script to set read-only](https://gist.github.com/jirutka/afa3ce62b1430abf7572#file-pg_grant_read_to_db-sh)
2. [Check DB accesses](http://dba.stackexchange.com/questions/4286/list-the-database-privileges-using-psql)
3. [Post about read-only creation](http://jamie.curle.io/posts/creating-a-read-only-user-in-postgres/)
