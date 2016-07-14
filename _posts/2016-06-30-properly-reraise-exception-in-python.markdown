---
layout: blog_base
title: Properly reraise exception in Python (2 and 3)
category: programming
tag: Python
meta_desc: Properly handle and reraise exception(exception chaining) in Python 2 and 3
---

Exceptions are a elegant and effective way to signal errors in programming for callers to deal with. As a good programming language, Python supports exceptions pretty well. However, there is one special case that requires attention when dealing with exceptions: what if I caught an exception, but instead of simply raise it, I want to wrap it in another class of exception *without* losing the stack trace of the original exception?

(Except for this purpose, another use case for reraising, or chaining exceptions would be during exception handling, another exception happens--so we defintely do not want to lose information about the original exception)

Here is a simple code sample to illustruste the question above:

~~~python
#!/usr/bin/env python
"""Illustration of reraise an exception
"""


class MyCustomException(Exception):
    pass


def foo():
    a = 1
    b = 0
    return a / b


def bar():
    try:
        foo()
    except ZeroDivisionError as e:
        # we wrap it to our self-defined exception
        raise MyCustomException(e)


bar()

~~~

So basically we want to wrap a general exception to our self-defined error. This could be especially useful if the python file is library like and we want to raise exceptions defined in our library only. However, the output looks like this when we run it:

~~~
Traceback (most recent call last):
  File "test.py", line 24, in <module>
    bar()
  File "test.py", line 21, in bar
    raise MyCustomException(e)
__main__.MyCustomException: integer division or modulo by zero
~~~

Clearly the traceback is much shorter than we expexted: it only traces back to bar but cannot trace back to where the original error happens. So one walk around is not to use our custom exception but use `raise` to raise the original exception. Then our purpose of wrapping exceptions cannot be achieved. We can also log the original exception with traceback first and then raise our custom exception--but it just not elegant and maybe for the caller this will be properly handled and therefore we should not even log it.

So we need a proper way to reraise the exception as our custom exception without losing traceback info. Here is the way to go in Python 2:

~~~python
def bar():
    try:
        foo()
    except ZeroDivisionError as e:
        # we wrap it to our self-defined exception
        import sys
        raise MyCustomException, MyCustomException(e), sys.exc_info()[2]
~~~

This is not very convinient for us developers. So Python 3 has a new syntax `raise from`. So the code can be simplied as:

~~~python
def bar():
    try:
        foo()
    except ZeroDivisionError as e:
        # we wrap it to our self-defined exception
        raise MyCustomException from e
~~~

References:
1. [SO Question: inner exception with traceback](http://stackoverflow.com/questions/1350671/inner-exception-with-traceback-in-python)
2. [The most underrated feature in Python 3](https://blog.ionelmc.ro/2014/08/03/the-most-underrated-feature-in-python-3/)
3. The PEP proposal, if you want to read the "origin"--[PEP 3134](https://www.python.org/dev/peps/pep-3134/)
