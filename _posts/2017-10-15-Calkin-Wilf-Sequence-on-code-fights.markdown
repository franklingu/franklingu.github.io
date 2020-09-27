---
layout: blog_base
title: Calkin Wilf Sequence on codefights
category: programming
tag: programming
meta_desc: Calkin Wilf Sequence problem on codefights for Python arcade and generator topic
---

Codefights is a website for practicing and brushing up on programming skills. Recently I have been working on its Python arcade, trying to learn more Python language special features. Well, generally I think most questions are well-thought but are not problems for me -- I am confident about my knowledge of Python so far. However, I did get stuck on one question in the generator section.

To be honest, I have not get the coroutine based generator thing inside out yet but this question: Calkin Wilf Sequence surely does not require that sort of knownledge but just generators -- and I got TLE -- time limit exceeded error. So I checked for a few parts to improve the effeciency but I still got TLE.

The version goes like:

~~~python
def calkinWilfSequence(number):
    def fractions():
        from collections import deque
        res = deque([(1, 1)])
        while True:
            ret = res.popleft()
            yield list(ret)
            a, b = ret
            c = a + b
            res.append((a, c))
            res.append((c, b))

    gen = fractions()
    res = 0
    while next(gen) != number:
        res += 1
    return res
~~~

Using deque, using tuple over lists, well, there are not other good suggestions that I can think of. So it must have something to do with the algorithm itself.

After Googling, I found [Calkin Wilf Tree on wikipedia](https://en.wikipedia.org/wiki/Calkin%E2%80%93Wilf_tree) and turns out there is a formula for it and the improved version becomes:

~~~python
def calkinWilfSequence(number):
    def fractions():
        curr, prev = [1, 1], None
        while True:
            yield curr
            prev = curr
            curr = [prev[1], 2 * prev[1] * int(prev[0] / prev[1]) - prev[0] + prev[1]]

    gen = fractions()
    res = 0
    while next(gen) != number:
        res += 1
    return res
~~~

And I timed the different versions, first time on my own PC with 8GB of memory:

~~~
In [3]: %timeit calkinWilfSequence([20, 1])
2.2 s ± 2.8 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)

In [4]: %timeit calkinWilfSequence2([20, 1])
1.78 s ± 23 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
~~~

Then on a desktop with 32GB of memory:

~~~
In [3]: %timeit calkinWilfSequence([20, 1])
524 ms ± 24.2 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
In [4]: %timeit calkinWilfSequence2([20, 1])
536 ms ± 24.2 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
~~~

So when memory is not a problem, getting rid of those math caculation can help a bit it seems but if the memory is indeed an issue, then the improved version is indeed the winner.
