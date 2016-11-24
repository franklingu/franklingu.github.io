---
layout: blog_base
title: grep and show capture group only
category: programming
tag: python
meta_desc: learn show capture group only for grep in linux
---

Linux/Unix terminal is powerful. Among many great tools such as cat, tail, head, less, vim, find, grep, cut and so many more, grep is very useful when we want to check if some pattern could be found within text stream. It is very rich in features and fast in performance.

There are many useful flags such as -E(extended regular expression) or -P(perl like regular expression), -v(--invert, select non-matching lines) or -o(show matched part only).

So some day I want to output capture group only. After Googling, many people are actually suggesting sed--sadly I am not good with sed. So I continued and find the solution using grep as follows:

~~~
echo "foo 'bar'" | grep -Po "(?<=')[^']+(?=')"
~~~

So for the grep part, -P is to use perl like regex, and then -o is to have matched part printed out only. However,  there is something more in the regex--`(?<=)` is called lookahead and we are not matching it but it will be looked ahead of the matched group.

A great trick for using grep!

References:
1. [superuser](http://superuser.com/questions/11130/can-gnu-grep-output-a-selected-group)
