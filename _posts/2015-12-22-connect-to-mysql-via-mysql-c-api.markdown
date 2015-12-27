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

Let's move on to do some useful work in DB. The code below is the simple class for checking user with correct password, inserting new user and updating nickname. So the schema is very simple as well: just "username", "password" and "nickname".

```cpp
// db_connection.h file
#ifndef DB_CONNECTION_H
#define DB_CONNECTION_H

#include <my_global.h>
#include <mysql.h>
#include <string>
#include <string.h>
#include <stdexcept>

using namespace std;

class db_connection
{
public:
    db_connection();
    ~db_connection();
    int check_user_existence(const char * username, const char * pswd);
    void insert_user(const char * password, const char * nickname);
    void update_user_nickname(const char * username, const char * nickname);
private:
    MYSQL *connection;
    MYSQL *connect_to_mysql();
    void execute_query(const char *query);
};

#endif

# db_connection.cpp file
#include "db_connection.h"

db_connection::db_connection()
{
    this->connection = mysql_init(NULL);
    connect_to_mysql();
}

db_connection::~db_connection()
{
    mysql_close(connection);
}

/// for executing a query but it does not return any result
void db_connection::execute_query(const char *query)
{
    MYSQL *con = this->connection;
    printf("Query: %s\n", query);
    if (mysql_query(con, query))
    {
        string err(mysql_error(con));
        throw std::runtime_error("Connection Error: " + err);
    }
}

MYSQL *db_connection::connect_to_mysql()
{
    MYSQL *con = this->connection;
    if (con == NULL)
    {
        printf("DB error: %s\n", mysql_error(con));
        exit(1);
    }
    if (mysql_real_connect(con, "localhost", "root", "", NULL, 0, NULL, 0) == NULL)
    {
        string err(mysql_error(con));
        throw std::runtime_error("Connection Error: " + err);
    }
    execute_query("use entry_task;");
    return con;
}

int db_connection::check_user_existence(const char * username, const char * password)
{
    string username_s(username, strlen(username));
    string password_s(password, strlen(password));
    string query = "select username from users where username = " + username_s +
        " and password = '" + password_s + "';";
    execute_query(query.c_str());
    MYSQL_RES *result = mysql_store_result(connection);
    if (result != NULL)
    {
        // for counting number of rows in the selection result
        int num_rows = mysql_num_rows(result);
        mysql_free_result(result);
        return (num_rows == 0) ? -1 : atoi(username);
    }
    else
    {
        return -1;
    }
}

void db_connection::insert_user(const char * password, const char * nickname)
{
    string nickname_s(nickname, strlen(nickname));
    string password_s(password, strlen(password));
    string query = "insert into users(password, nickname) values('" + password_s +
        "', '" + nickname_s + "');";
    execute_query(query.c_str());
}

void db_connection::update_user_nickname(const char * username, const char * nickname)
{
    string nickname_s(nickname, strlen(nickname));
    string username_s(username, strlen(username));
    string query = "update users set nickname = '" + nickname_s +
        "' where username = " + username_s + ";";
    execute_query(query.c_str());
}
```

References:

* [Stackoverflow question: MySQL C API wont compile](http://stackoverflow.com/questions/3396181/gcc-wont-compile-and-run-mysql-c-libraries)
* [MySQL C API tutorial](http://zetcode.com/db/mysqlc/)
