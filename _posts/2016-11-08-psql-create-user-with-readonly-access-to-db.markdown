---
layout: blog_base
title: use psql to create database user with readonly access to db
category: programming
tag: postgres
meta_desc: use psql to create database user with readonly access to a postgres database
---

As recently I am working with some structured relational data, I choose to use postgres as the database. And after cleaning the data and move it into database, some colleague came and asked for the access to the data. So if I choose to trust him, I can just give him my database super user and password and ask him to use python interface program provided by me. However, what if he decided to connect to my db and decided to `DROP DATABASE`? Trust is cheap. Let's setup restriction.

~~~bash
~~~

References:
1. []()
2. []()
