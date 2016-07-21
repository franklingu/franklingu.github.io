---
layout: blog_base
title: Notes after reading a level-up book about Python -- how to be more Pythonic, elegant and effective
category: programming
tag: Python
meta_desc: Notes after reading a level-up book about Python -- ideas about how to be more Pythonic, elegant and effective.
---

Python is elegant and expressive and there is not much needed to prove this. Simply open up a terminal and get started with its English-like syntax and solve hard and tricky problems in shorter and more beautiful code. I have been learning and using Python for quite some time and find that I need to know more in-depth knowledge. A lot of the time I just find the language so easy to use that I may just stop there without ever digging into it. By thinking about how to further improve it, in terms of extensibility or performance, I am pushing myself to become a better Pythonic programmer.

So recently I started reading this book [编写高质量代码：改善Python程序的91个建议](https://book.douban.com/subject/25910544/). It is written in Chinese -- Python is also very popular in China and there are quite a few good Python programmers there. Honestly this book share the same problem with most Chinese programming books, or programming books translated into Chinese: the author or translators are simply not careful enough -- quite a few code snippets contain typos. Another common problem, which can be found in this book as well, when Chinese authors make any direct or indirect references to other books, they do not provide links or notes to original text. (This is simply unimaginable in English publishing industry but it is improving gradually in China as well). For the first problem, when I was reading, I will just let go of those typos -- those typos do not really affect my understanding of the idea being illustrated as I know Python basics pretty well. As for the second problem, it is more about respect for the original author, though serious, does not affect reading much. However, I have to point out that this book tries to cover so much that it does not get deep into each topic, especially when it comes to hard topics like MRO, metaclass. Therefore, overall I think this book is worth reading, only that while reading, we just need to glance at the ideas and Google and dig deep into hard topics. So be quick while reading but be slow when studying some in-depth topics.

It composes of in total 8 parts:

1. introduction (about Pythonic and coding style in general)<br>
   This part is pretty subjective and personally I guess it can be just skipped. The target audience of this book should already know about those basic ideas about Python easily. As for some suggestions about coding style, those are simply subjective and it depends on the teams requirements as well.

2. common practices (some common bad practices to avoid and good ways of achieving some goals)<br>
   This section contains some recommended practices, including using assert, swapping without tmp variable, lazy evaluation, avoiding using eval, differentiating is and == and so on. My personal suggestion is that we can just scan through this section and get what the basic idea is for each topic.

3. basic syntax (some powerful keywords to be used in different senarios)<br>
   Especially for programmers from other programming languages, there are some handy and powerful syntax in Python for some common tasks, for example, `with` keyword and `else` in exception handling. There are also some common pitfals to take note such as default mutable argument, using `return` or `break` in `finally` clause. So this section should be covered with some extra attention to avoid these sort of mistakes and write better code.

4. libraries (recommendations of some libraries for some common tasks)<br>
   This section covers some good libraries for different tasks. For exmaple, lxml for XML parsing, argparse for argument parsing(docparse as the level-up solution), pandas to handle large csv files. This section also tries to introduce how to use copy, traceback, Queue properly from the standard library. However, for each library the author simply mentions and goes without much detail so there is not much point in digging into the book too much. Google, StackOverflow and API documentation (and even the source code) are always your best friends.

5. design patterns (implementation of some design patterns in Python for extensibility)<br>
   This section covers Singleton, mixin, pub-sub and state-machine patterns only. There are certainly better books about design patterns in Python such as [Python in practice](https://www.amazon.com/Python-Practice-Concurrency-Libraries-Developers/dp/0321905636)

6. built-in mechanisms (dig deep into Python built-in methods)<br>
   This section is supposed to be very deep, touches very advanced topics such as MRO, metaclass. It covers generator and coroutine, LEGB(name resolution order), iterator and operator overloading as well. And as you can see, it tries to cover so much in a not long section and for each topic, you will not get really much details for each topic. But the point of reading this section is to get a basic idea of these advanced ideas and later you should study more by yourself.

7. tools in development cycle (some tools to ease Python development)<br>
   Covers pip, pylint and TDD in Python with unittest module. Honestly I am just wondering if the author wants this section for completeness or not. It is actually more like a waste of printing than the first section in my opinion.

8. performance analysis and improvement<br>
   Introduces `cProfile`, `memory_profile` as speed and memory profiling tools and also includes some techniques such as using iterator, multiprocessing, C/C++ extentions and Cython.

A book worth glancing and get a sense of some good topics for later self study. There is still a very long way after knowing that there are something like MRO or metaclass before we can become Python experts. It is going to be a long and hard journey to become a master, although Python is famous for its simplicity. In fact, simplicity is the highest form of complexity--when we can decomplex complex things, we become masters.
