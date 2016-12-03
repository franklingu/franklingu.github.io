---
layout: blog_base
title: About Python 3, to support or not to, it is not a question
category: programming
tag: python
meta_desc: my thoughts on recently a very hot discussion about The Case Against Python 3
---

Python 3 has been out for quite a long time and because of various reasons, mainly the decision of non-backward-compatability, the migration process is still slower than expected. Python 2 is very easy to use and great to work with already and all of sudden the community is saying that we have several great ideas to improve Python 2 and all of existing Python programmers need to rework on their skills. As a Python programmer myself, honestly I am not happy about this--and I do not think any Python programmers are happy about old code just break and will not run at all--because we are programmers and we are human, we do not like changes and we like things to be stable so that we are still in our old comfort zone.

But, is Python 3 not worth the migration at all? Or is Python 3 just so bad that it is going to ruin the Python language? I am no expert in language design and implementation--yet I would claim that Python 3 is the future, although we know it is not perfect, and it will never be, but we know it is better.

So all of this discussion started from this article [The Case Against Python 3](https://learnpythonthehardway.org/book/nopython3.html), by Zed Shaw, the author of a very famous book [Learn Python the Hard Way](https://learnpythonthehardway.org/book/). I did not read this book cover to cover but with a few glances, I believe it is a good book to people who first enter Python and programming world. I fully respect and admire his effort and creation in this book. And recently some people wants to remove this book from reddit's recommended Python books unless the author upgrades code samples in the book to Python 3. Therefore we have this article and there is a heated discussion in the community thereafter.

So in the article, Zed basically mentioned 3 points against Python 3:
1. Why it has to be made incompatible with Python 2?
2. Implementing Unicode has brought a lot of problems: it is now thus difficult for new comers to comprehend strings in Python 3. And some libraries are simply broken by their documentation.
3. There are more and more alternatives to accomplish one thing now, which is just confusing to new comers and against the Zen of Python

About first point, I am no expert in Language design and thus I would not make any comments about how hard it is to make both Python 3 and Python 2 code to both run on the same virtual machine. But I guess it is just hard enough I guess, every language designer should know that what makes a language popular is not just how great a language is but also how easy for new comers to pick up and stick to the language. By making it backward incompatible, PSA definitely does not intend to drive programmers away. It is more like despite the fact that this could drive some programmers away, they think it is worth it to fix some broken stuff in Python 2.

About second point, as I am an experienced Python developers now and I work with English, Chinese and Japanese at my work, I think I am at a good position to bring up some ideas. Python 2 in my opinion is more like a mixed compromise--those English speakers who believes ASCII table is just enough for the complicated world and those can actually see the need to deal with the complication. In fact, in Python 2 if you ever needs to deal with languages like Chinese, the recommended way is for only input and output, use string(raw strings in Python 3) and immediately convert unicode for others parts to user--which aligns so good with Python 3.

Maybe just sticking to ASCII table is easier for new comers to get--which I highly doubt, but this handling of strings in Python 2 is simply broken. In my opinion, it is not a good idea at all to stick to some tradition just because it is there. Unicode is the future and any resistance to this trend is in vain. And I believe this is the same reason why PSA believes that Python 3 is backward incompatible with Python 2.

Zed also mentions for + and format yield different result when concatenating one byte string and one string in Python 3. Well, to be honest I agree with him on this--inconsistency like this is simply bad for programmers and it just a trap for programmers, a source of bugs. Also he mentions some core libraries' documentation is not updated--well, this is true as well. Simply such a migration is way too big and I guess that is why PSA decides to support Python 2 until 2020--which fairly long.

About the third point, I agree with Zed as well. I think the Ruby like syntax is pretty good but adding it to Python may just brings confusion into the community. There should be only one obvious way to accomplish some task. But it is not going to make Python 3 dead. It is a small flaw but far from a lethal cancer.

About Python 3, I believe the string fix is great. And quote from [The (lack of a) case against Python 3](http://blog.lerner.co.il/case-python-3/).

> For people who do need Unicode, Python 3 isn’t perfect, but it’s far, far better than Python 2. And given that some huge proportion of the world doesn’t speak English, the notion that a modern language won’t natively support Unicode strings is just nonsense.

Many fixes such as behavior of `dict.keys()`, `dict.items()`, `zip` to speed things up work well for daily use of Python programmers as well. We see popular libraries and frameworks like Django, flask, numpy, scipy, pandas all have successfully migrated to Python 3. In fact, in science communities like numpy and scipy, some people are proposing that we should just drop support for Python 2 already. Compared to scientists, programmers are lazier and more unwilling to change. But we saw [Ubuntu uses Python 3 as the default Python that comes with installation](https://wiki.ubuntu.com/XenialXerus/ReleaseNotes) and [Fedora is planning to do the same thing](https://fedoraproject.org/wiki/Changes/Python_3_as_Default).

Is Python 3 the perfect implementation? No. But is it ruining the language? Far from ruining but in fact, I would like to say that Python will further gain popularity. What is the next thing to expect? JIT(More like Java rather than PyPy)? Fix of GIL? We always hope for a better future based on the reality of Python.
