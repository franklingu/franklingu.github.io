---
layout: blog_base
title: Connect to MySQL via MySQL C API
category: programming
tag: programming, C, MySQL
meta_desc: Connect to MySQL server via MySQL C API in C/C++ easily.
---

MySQL(other database management systems as well) have connectors in different languages(such as C++, Python, Ruby, Java and so on) already and we do not have many opportunities working with MySQL C APIs nowadays. However, C API is still the most native APIs in MySQL and in this post I will guide you through the process of connecting to MySQL via C API.

(Assume you have mysql-server, mysql-devel installed already on your computer). The following C example:

```c
// version.c
#include <my_global.h>
#include <mysql.h>

int main(int argc, char **argv)
{
  printf("MySQL client version: %s\n", mysql_get_client_info());

  return 0;
}
```

Compile the program above with:

```
gcc -o verion version.c $(mysql_config --cflags --libs)
# mysql_config is a tool from mysql, providing useful information when compiling
# mysql client code to connect to mysql server
./version  # you should see the version information printed
```

Notice that if you use C++, the example works as well. In fact, you can just use MySQL C APIs in C++ without any trouble(some conversions may be needed).

Let's move on to do some useful work in DB.

```c
#include <my_global.h>
#include <mysql.h>

int main(int argc, char **argv)
{  
  MYSQL *con = mysql_init(NULL);  // initialize a connection

  if (con == NULL) 
  {
      fprintf(stderr, "%s\n", mysql_error(con));
      exit(1);
  }

  if (mysql_real_connect(con, "localhost", "root", "root_pswd", 
          NULL, 0, NULL, 0) == NULL)   // login with your credentials
  {
      fprintf(stderr, "%s\n", mysql_error(con));
      mysql_close(con);
      exit(1);
  }  

  if (mysql_query(con, "CREATE DATABASE testdb"))   // create a testdb
  {
      fprintf(stderr, "%s\n", mysql_error(con));
      mysql_close(con);
      exit(1);
  }

  mysql_close(con);
  exit(0);
}
```

The code above simple create a DB named "testdb". With this example, creating table, inserting values and updating record should be easy. A simple C++ client for updating and inserting:

```cpp
// TABLE users:
// username   int      autoincrement   primary_key
// nickname   varchar

#include <my_global.h>
#include <mysql.h>
#include <iostream>
#include <string>

using namespace std;

void finish_with_error(MYSQL *con)
{
    cout << "Connection Error: " << mysql_error(con) << endl;
    mysql_close(con);
    exit(1);
}

void execute_query(MYSQL *con, const char *query)
{
    if (mysql_query(con, query))
    {
        finish_with_error(con);
    }
}

MYSQL *connect_to_mysql()
{
    MYSQL *con = mysql_init(NULL);
    if (con == NULL)
    {
        cout << mysql_error(con) << endl;
        exit(1);
    }
    if (mysql_real_connect(con, "localhost", "", "", NULL, 0, NULL, 0) == NULL)
    {
        finish_with_error(con);
    }
    execute_query(con, "use entry_db;");
    return con;
}

void insert_user(string nickname)
{
    MYSQL *con = connect_to_mysql();

    string query = "insert into users(nickname) values('" + nickname + "');";
    execute_query(con, query.c_str());

    mysql_close(con);
}

void update_user(string username, string nickname)
{
    MYSQL *con = connect_to_mysql();

    string query = "update users set nickname = '" + nickname +
        "' where username = " + username + ";";
    execute_query(con, query.c_str());

    mysql_close(con);
}

int main(int argc, char **argv)
{
    insert_user("test insert");
    update_user("1", "test update");

    return 0;
}
```

References:

* [Stackoverflow question: MySQL C API wont compile](http://stackoverflow.com/questions/3396181/gcc-wont-compile-and-run-mysql-c-libraries)
* [MySQL C API tutorial](http://zetcode.com/db/mysqlc/)
