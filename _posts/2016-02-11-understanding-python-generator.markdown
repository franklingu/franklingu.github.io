---
layout: blog_base
title: Understanding Python Generator
category: programming
tag: Python
meta_desc: Understanding Python Generator--how to use generator for data generation and coroutine
---

Recently I was working with generators and it really took me some time to get it. So I decided to write this post to share. Before I dive into explanation and examples of generators in Python, let me first point out some great posts about generators in Python:

1. [Improve Your Python: 'yield' and Generators Explained](https://www.jeffknupp.com/blog/2013/04/07/improve-your-python-yield-and-generators-explained/) (The author is pretty good at Python and his small book--Writing Idiomatic Python--is also worth reading if you want to write more readable Python code. The only problem with this post is that he puts too much emphasis on generator as iterator but not the multitasking part. However, most people use generator as iterator anyway.)
2. [Introduction to Generators](https://wiki.python.org/moin/Generators) (Python Wiki)
3. If you are really brave and you are confident that you will be able to get it, see [PEP 342](https://www.python.org/dev/peps/pep-0342/). Honestly I am still blur on some parts in this PEP but I would surely recommend this as it contains a lot of useful and intriguing information about why and how generators are generators in Python now.

So first of all, we need to understand subroutine and coroutine:

> In computer programming, a subroutine is a sequence of program instructions that perform a specific task, packaged as a unit. This unit can then be used in programs wherever that particular task should be performed.

> Coroutines are computer program components that generalize subroutines for nonpreemptive multitasking, by allowing multiple entry points for suspending and resuming execution at certain locations. Coroutines are well-suited for implementing more familiar program components such as cooperative tasks, exceptions, event loop, iterators, infinite lists and pipes.

So according to definitions from Wikipedia above, you can see the most useful features of generators in Python already: iterators and infinite list. By calling <code>yield</code>, the function is voluntarily giving up control with context saved. After that you can execute the generator function from its start or from the part where control was handed to others(where <code>yield</code> is). Sounds confusing? Let us see some examples.

```python
import math
def get_primes_subroutine(input_list):   # the subroutine version
    result_list = list()
    for element in input_list:
        if is_prime(element):
            result_list.append(element)
    return result_list

def get_primes_coroutine(input_list):   # the coroutine version
    for element in input_list:
        if is_prime(element):
            yield element

def is_prime(number):
    if number > 1:
        if number == 2:
            return True
        if number % 2 == 0:
            return False
        for current in range(3, int(math.sqrt(number) + 1), 2):
            if number % current == 0: 
                return False
        return True
    return False

# use case of two functions
for x in get_primes_subroutine([i for i in range(1, 100)]):
    print(x)
for x in get_primes_coroutine([i for i in range(1, 100)]):
    print(x)
```

So if you take a look at the code above, it seems that there is no difference in subroutine and coroutine. But wait a moment, let's append this block of code:

```python
print(get_primes_subroutine([i for i in range(1, 100)]))   # print the list
print(get_primes_coroutine([i for i in range(1, 100)]))   # <generator object get_primes_coroutine at [some memory location]>
```

So subroutine does not finish and return until the whole list is computed. Coroutine on the other hand, gives back control after one prime is found and next invocation starts from previously saved context. So effectively, the <code>yield</code> expression will convert a function to a generator function. So when you call the generator function, you get back generator. Only when you call next method on generator object, the execution starts and pauses at yield expression(We say "pause" here because we can still continue later).

Well, that is the main use of generator in Python and the only use of generator in Python before PEP 342. But now we have another use case for <code>yield</code> now in Python. See this example:

```python
import random

def get_data():
    """Return 3 random integers between 0 and 9"""
    return random.sample(range(10), 3)

def consume():
    """Displays a running average across lists of integers sent to it"""
    running_sum = 0
    data_items_seen = 0

    while True:
        data = yield
        data_items_seen += len(data)
        running_sum += sum(data)
        print('The running average is {}'.format(running_sum / float(data_items_seen)))

def produce(consumer):
    """Produces a set of values and forwards them to the pre-defined consumer
    function"""
    while True:
        data = get_data()
        print('Produced {}'.format(data))
        consumer.send(data)
        yield

if __name__ == '__main__':
    consumer = consume()
    consumer.send(None)
    producer = produce(consumer)

    for _ in range(10):
        print('Producing...')
        next(producer)
```

So the example here demonstrates another use case of generator in Python: cooperative tasks. So as explained before, when we say <code>consumer = consume()</code> we get back a generator object. Now we send None to it, we basically mean execute the generator until it yields the control. So consumer is paused at <code>data = yield</code> and the control is back to main part. When we call next on producer, we basically mean that execute producer until next yield is encountered. But inside produce, it sends some data to consumer, which means that consumer will now take over control and consume those data. The control is back from consumer to producer when next yield in consumer is encountered. If you have a look and execute the following program, you can trace it more easily:

```python
import random

def get_data():
    """Return 3 random integers between 0 and 9"""
    return random.sample(range(10), 3)

def consume():
    """Displays a running average across lists of integers sent to it"""
    running_sum = 0
    data_items_seen = 0
    print('step 2')

    while True:
        data = yield  # step 2 until here, also step 7 until here
        print('looping, step 7')
        data_items_seen += len(data)
        running_sum += sum(data)

def produce(consumer):
    """Produces a set of values and forwards them to the pre-defined consumer
    function"""
    while True:
        data = get_data()
        print('looping, step 6')
        consumer.send(data)
        print('looping, step 8')
        yield

if __name__ == '__main__':
    consumer = consume()   # consumer is a generator object now
    print('step 1')
    consumer.send(None)   # start executing consumer
    print('step 3')
    producer = produce(consumer)  # producer is a generator object now
    print('step 4')

    for _ in range(10):
        print('looping, step 5')
        next(producer)
        print('looping, step 9')  # after step 9 is step 5 again
```

If you can understand this example, let's go back to the first use of generator--acting as an iterator. You will see that yield is still doing the same thing, only that this time only next is called on it and nobody sends anything to do cooperative multitasking with it anymore--so the control is always handed back to caller.

Some more tips about generator:

1. You cannot have return statement in a generator function.
2. Generator(or iterator) is generally more memory friendly and faster.
3. Generator as iterator demostrates power of laziness in programming. Haskell is the laziest and purest of all programming languages.

To sum up:

* Generator in Python is coroutine now. But still the most frequent use is to generate a list of data.
* <code>yield</code> is like a return but it saves the current context. So if next is called on a generator, the execution resumes from statement right after <code>yield</code>. And since it is like return, you cannot have return in a generator function.
* You can use next or send on a generator but they are for different purposes. next for using generator as an iterator and send for cooperative multitasking.
