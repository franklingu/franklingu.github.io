---
layout: blog_base
title: Advice for freshmen who are to enter NUS SoC
category: life
tag: advice, programming, NUS, SoC
meta_desc: A compilation of personal advice to those who are to start 3-or-4-year learning journey in NUS SoC.
---

If you actually searched and found this article because you are going to enter SoC, Congratulations. Honestly I would not claim that this is the best place for learning programming(in Singapore, or Asia, even the world)--it is certainly a nice place for you to stretch your limits and test what you can do. And please, forget about QS or Times rankings, they do not mean anything--average or the whole could be very misleading and what you are supposed to do is just try your own best.

And one more thing to confirm before you even started reading: programming is the future and it is pretty cool--at least in my opinion and many other's too but if you chose this major just because after graduation you can be paid better than engineering students and science students, please reconsider it. Cause it is just freaking boring and frustrating if you do not throw yourself into it and enjoy and I am not kidding.(BTW, I am pretty sure you know that lawyers and doctors are paid better right? Bankers are well-paid too)

Who am I? I am currently a year-4 Computer Engineering student in NUS(that is not even SoC you may say. especially in my batch engine is watching over CEG). Yet I focused mainly on CS-related modules and tried to enrich myself in programming and I believe I am still in a proper position to say this to those who share love for programming and best of all, still have plenty of time before graduation. But sadly I will not be able to touch on every perspectives of programming as I am lazy and did not learn that much myself. (For your information: [here](https://docs.google.com/document/d/1FbCWcnnajHWk594dKmN35b_we50WZf_-cwxqg-cYaRY) is a doc with more intelligence and it is sort of the official guide too and make sure you have read it)

1. ***Learn to use Unix based system, Linux or Mac***<br>
   I am not an anti-Windows person and I do not agree with those who just blindly criticize Windows. At least one thing that Windows is super good at: games. There are plenty of things to explore about Windows too(with rise of powershell and things like Chocolatey, it is becoming more programmer-friendly now). But as a programmer, learning Unix based system is like reading bible in becoming a Christian, unless you decide that you will be a DotNet developers and stick with Windows forever after, which is a very risky thing to do by the way.
     * [Installing Linux](http://lifehacker.com/5778882/getting-started-with-linux-the-complete-guide)
     * [Reading about Linux/Unix](http://unix.stackexchange.com/questions/80/recommended-reading-to-better-understand-unix-linux-internals), [Recommended linux list](http://www.thegeekstuff.com/2009/01/12-amazing-and-essential-linux-books-to-enrich-your-brain-and-library/), [Another programmer's recommendation: in Chinese](http://coolshell.cn/articles/355.html)
     * Personal favorite, about philosophy that powers Unix: [The art of Unix programming](...)
2. ***Learn to use version control tools***<br>
   Git or SVN, or Mercurial. Just pick one(perferably Git) and start 1) backup your code and 2) keep a clean and nice record of development for reviewing and collaboration. Some students after 4 years, still do not use version controls and most students just use it as a file backing-up tool. After getting a proper programming job you will learn to use version control the hard way if you do not work on it now.
     * [Pro Git](https://git-scm.com/book/en/v2)
3. ***Learn Python, or Ruby as opposed to Java***<br>
   Well, I am not saying Python or Ruby are superior(but cleaner code results in better productivity). But just using Java will limit you as a programmer. As opposed to static-typing, really-OO(not purely, but mostly) Java, learn Python can help you compare dynamic vs static and also get a sense of functional programming. And speaking of functional, it would be much better if you try functional and try to master it, even if you are not required in school or in work.
     * [Learn Python the hard way](learnpythonthehardway.org/)
     * [The well-gounded Rubyist](https://www.manning.com/books/the-well-grounded-rubyist)
4. ***Code, real code, not just for course projects***<br>
   Go to GitHub and there are plenty of good open source projects. You can also consider [Google Summer of Code](https://www.google-melange.com/). A recommendation is [Teammates](https://github.com/TEAMMATES/repo), for which you will be learning a lot, but you do not need a lot of pre-knowledge to get started.
     * [Contribute on GitHub](https://guides.github.com/activities/contributing-to-open-source/)
5. ***Work on CS fundamentals***<br>
   It is easy to trick yourself to believe that you are good at those fundamentals already once you have covered CS2105(networking), CS2106(operating system), CS2107(security), CS2103(software enigeering) and CS2102(database). The truth is that they are just touching the surface of fundamentals. Nowadays more and more high level frameworks and applications are developed and used in production and you may believe that you are OK by just working with application level code. Just pray that lack of knowledge about fundamentals does not force you to learn the hard way. In particular, networking and operating system.
6. ***Learn at least one functional programming language***<br>
   One of the reason that functional is picking up is concurrent processing. With immutability and data-driven strategy, you can worry less about sharing of variables and stuff(Why Scala is Scala, because it is *sca*-lable *la*-nguage). And functional programming is supposed to be more extensible as well(arguably true).
   You can take CS2104 for this. Of course you are free to check out Coursera as well([Functional programming in Scala](https://class.coursera.org/progfun-005/lecture)). The newly rising star in functional programming is Scala(Twitter, LinkedIn and etc). Facebook used OCaml for its Hack. Exilir is used by Whatsapp. Closure is also a good candidate to learn and it is in the classic Lisp family(Lisp was born in 1958, only a bit younger than Fortran). Haskell is really pure(it is okay to let go of the meaning of pure here). Anyway, pick your one. HackerRank has plenty of exercises for functional.
     * Programming in Scala
     * Read world OCaml
7. ***Learn about concurrency and parallelism***<br>
   Moore's law is dead for number of transistors per core since 2003 or so. People are working hard on getting more cores and more machines now. This topic is hot and will continue to be hot(one example of Hadoop, data are distributed so that overall processing time is significantly shorter)
     * Sadly, I am not good at this myself. Will probably add something later or you can just suggest to me after you find out
8. ***Enrich your life, meet more people***<br>
   You can go SEP or NOC. Join some CCAs. Do not just focus on grades but do learn what is taught. Getting a first class only ensures that your resume is good for HRs in banks and banks are like the worst places to go if you are to develop programming skills. So get a balance of study and play. Dealing with people is also important, if not more than coding, in a large project. And think for your future, PM, architect or senior engineer? But it is okay not to answer this question now, you will have a lot of time to figure this out.

Well, it is your university in the end you have to plan for yourself. Things may not just work as expected and it is OK. Just keep working and pushing your limit. You have more potential than you think.

Some recommended blogs and books:

* SICP, CLRS, The Dragon Book, Gang of Four, Code Clean, Clean Coder, Refactoring, The Pragmatic Programmer, Programming Pearls, and etc: these are just too famous to even list here
* [Guide for becoming a web developer](http://christopherpound.com/so-you-want-to-be-a-web-developer/)
* [Cracking the coding interview](http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X)
* [Soft skills for programmer](http://www.amazon.com/Soft-Skills-software-developers-manual/dp/1617292397)
* [The Passionate Programmer](https://pragprog.com/book/cfcar2/the-passionate-programmer)
* [How to level up as a programmer: Chinese](http://coolshell.cn/articles/4990.html)
