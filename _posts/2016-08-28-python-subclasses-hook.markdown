---
layout: blog_base
title: Python __subclasses__ hook
category: programming
tag: Python
meta_desc: Python subclasses hook and simple explanation for usage.
---

As learning of Python goes deeper and deeper, more and more special hooks are being discovered and I realize that quite some tasks could be done in different ways.

So someday I was trying to achieve a simple factory pattern. For that to happen, I need to register subclasses and dispatch accordingly. So previously I would just use a simple decorator to register a class when imported. And the basic skeleton goes like this:

~~~python
g_registry = {}
def register_cls(entry_name):
    def inner(cls):
        g_registry[entry_name] = cls
        return cls
    return inner


def get_handler(name):
    return g_registry.get(name)

class Base(object):
    pass


@register_cls('A')
class ClsA(Base):
    pass


@register_cls('B')
class ClsB(Base):
    pass
~~~

Certainly this just works fine, and generally we are just OK with having a global g_registry(In fact we can further improve this for sure and remove global variable). But that day I was just browsing online and find some introduction to __subclasses__ hook in Python. So I read on and found it very interesting in solving this registration problem. Now the registration could simply to omitted.

~~~python
def get_handler(name):
    for cls in Base.__subclasses__():
        if cls.entry_name == name:
            return cls
    return None

class Base(object):
    pass


class ClsA(Base):
    entry_name = 'A'


class ClsB(Base):
    entry_name = 'B'
~~~

So you can see the code is much shorter and clearer now.

After searching, I found that there is much resources related to subclasses hook. So I did a simple experiment myself.

~~~python
# test1.py
class Base(object):
    pass

class A(Base):
    pass

# test2.py
from test1 import Base
class B(Base):
    pass

# main.py
import test1
print(test1.Base.__subclasses__())
import test2
print(test1.Base.__subclasses__())
~~~

According to explanation from [Tim Peters](https://mail.python.org/pipermail/python-list/2003-August/210297.html), this is implemented to reduce searches for MRO. So it is more like a compromise and therefore there is not much documentation around. However, this is indeed handy at times.

References:
1. [SO question](http://stackoverflow.com/questions/2877110/python-new-style-classes-and-subclasses-function)
2. [Mailing list](https://mail.python.org/pipermail/python-list/2003-August/210297.html)
