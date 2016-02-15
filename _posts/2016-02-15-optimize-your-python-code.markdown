---
layout: blog_base
title: Optimize your Python code
category: programming
tag: Python
meta_desc: Optimize your Python code--use of generator, Ctypes, Pypy, Cython and C extensions
---

Python is a great programming language that has elegence and expressiveness built-in from the very start--the only problem in some people's mind, however, is that CPython is just really slow. Although we did not choose Python because it is fast or something but we choose it despite the fact that it is pretty slow, there are quite some things for us to do to optimize our Python code. Just a simple reminder:

>  Premature optimization is the root of all evil.   --DonaldKnuth

OK. Let us just do a very simple task: sum up a sequence of random numbers.

So Tip Number 1: use generator instead of list.append. This usually gives us a very small performance boost and most importantly, it is more memory-friendly. So by using list.append, we are actually building the list inside the memory but with generator, we just get one item at one time. (More on generator in Python, see [my post about Python](/programming/2016/02/11/understanding-python-generator/))

{% highlight python %}
import timeit
import random


def generate(num):
	while num:
		yield random.randrange(10)
		num -= 1


def create_list(num):
	numbers = []
	while num:
		numbers.append(random.randrange(10))
		num -= 1
	return numbers


if __name__ == '__main__':
	print(timeit.timeit(
		'sum(generate(999))', setup='from __main__ import generate',
		number=1000))   # >>> 0.630333900452
	print(timeit.timeit(
		'sum(create_list(999))', setup='from __main__ import create_list',
		number=1000))   # >>> 0.652122974396
{% endhilight %}

However, there is another side of the story: using list comprehension is generally considered a good practice(more Pythonic) and could result in better performance as well.

{% highlight python %}
import timeit
import random


def generate(num):
	while num:
		yield random.randrange(10)
		num -= 1


def create_list1(num):
	numbers = []
	while num:
		numbers.append(random.randrange(10))
		num -= 1
	return numbers


def create_list2(num):
	return [random.randrange(10) for _ in xrange(1, (num + 1))]


if __name__ == '__main__':
	print(timeit.timeit(
		'sum(generate(999999))', setup='from __main__ import generate',
		number=1))  # >>> 0.577567100525
	print(timeit.timeit(
		'sum(create_list1(999999))', setup='from __main__ import create_list1',
		number=1))  # >>> 0.646397829056
	print(timeit.timeit(
		'sum(create_list2(999999))', setup='from __main__ import create_list2',
		number=1))  # >>> 0.540718078613
{% endhighlight %}

To understand why list comprehension ended up faster than generator, we need to dig into Python implementation. But an easier approach would be simply use cProfile and see the result.

~~~
>>> cProfile.run('sum(generate(999999))')
         3000001 function calls in 1.066 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    1.066    1.066 <string>:1(<module>)
  1000000    0.333    0.000    0.969    0.000 benchmark.py:5(generate)
   999999    0.558    0.000    0.636    0.000 random.py:173(randrange)
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
   999999    0.078    0.000    0.078    0.000 {method 'random' of '_random.Random' objects}
        1    0.096    0.096    1.066    1.066 {sum}


>>> cProfile.run('sum(create_list1(999999))')
         3000001 function calls in 1.152 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.001    0.001    1.152    1.152 <string>:1(<module>)
        1    0.406    0.406    1.146    1.146 benchmark.py:11(create_list1)
   999999    0.583    0.000    0.665    0.000 random.py:173(randrange)
   999999    0.076    0.000    0.076    0.000 {method 'append' of 'list' objects}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
   999999    0.081    0.000    0.081    0.000 {method 'random' of '_random.Random' objects}
        1    0.004    0.004    0.004    0.004 {sum}


>>> cProfile.run('sum(create_list2(999999))')
         2000003 function calls in 0.917 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.001    0.001    0.917    0.917 <string>:1(<module>)
        1    0.252    0.252    0.912    0.912 benchmark.py:19(create_list2)
   999999    0.564    0.000    0.642    0.000 random.py:173(randrange)
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
   999999    0.078    0.000    0.078    0.000 {method 'random' of '_random.Random' objects}
        1    0.018    0.018    0.018    0.018 {range}
        1    0.004    0.004    0.004    0.004 {sum}
~~~

Now Tip Number 2: use ctypes to load C libraries and call APIs in C. So by calling C functions for critical parts can reduce timing by a lot.

{% highlight python %}
import timeit
import random
from ctypes import cdll


def generate_c(num):
	libc = cdll.LoadLibrary('libc.so.6')
	while num:
		yield libc.rand() % 10
		num -= 1


if __name__ == '__main__':
	print(timeit.timeit(
		'sum(generate_c(999999))', setup='from __main__ import generate_c',
		number=1))  # >>> 0.252245903015
{% endhighlight %}

That is more than 50% timing improvement. But can we do better?

Tip Number 3: use of Cython.

To be continued

Notes and disclaimers:

1. If you are not clear about different implementations of Python, read [Why there are so many Pythons](http://www.toptal.com/python/why-are-there-so-many-pythons)
2. Optimization itself is not wrong. What is wrong with many programmers' optimizing some code is that they are not even sure if these are bottlenecks. Read [this blog post](http://c2.com/cgi/wiki?PrematureOptimization) for more information
