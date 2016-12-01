---
layout: blog_base
title: unzip with glob syntax to work with multiple zip files
category: programming
tag: linux
meta_desc: unzip with glob syntax to work with multiple zip files
---

glob syntax is powerful when we work in Linux terminals. We use it in less, grep, find and others. However, it just does not work with unzip. So if we try:

~~~
➜  test ll
total 200K
-rw-rw-r-- 1 junchao junchao 98K Dec  1 23:28 test1.zip
-rw-rw-r-- 1 junchao junchao 98K Dec  1 23:28 test2.zip
➜  test unzip *.zip
Archive:  test1.zip
caution: filename not matched:  test2.zip
~~~

So clearly for test2.zip, the processing is not what we want--we want unzip all zip files in this folder. So the correct way of doing it:

~~~
➜  test unzip "*.zip"
Archive:  test2.zip
 extracting: test2.txt

Archive:  test1.zip
  inflating: test2.txt

2 archives were successfully processed.
~~~

Why is this? In the first case, glob syntax will expand `*.zip` to `test1.zip test2.zip`. So the command becomes `unzip test1.zip test2.zip`. So unzip does not how to deal with the other parameter any more. But if we put quotes, then that is one argument to unzip program and unzip can expand that within it.

References:
1. [unzip multiple files](https://chrisjean.com/unzip-multiple-files-from-linux-command-line/)

