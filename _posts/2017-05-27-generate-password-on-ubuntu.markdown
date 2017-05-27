---
layout: blog_base
title: use strong passwords with help of ubuntu
category: others
tag: software
meta_desc: generating strong passwords using apg and store them securely, on ubuntu
---

Passwords are everywhere. For my online bank accounts I need password, for some game forums I need password, for Gmail or Facebook I need password -- and since I do not want to get hacked for all of these in case some hacker cracked one down, I want to use different passwords for different websites (As a matter of fact, I believe for regular users of Chrome, mostly if Google is hacked, all of the passwords are revealed LOL. So effectively people like me have blind trust to giants like Google just like the during the old days people just blindly believe in some god or gods. As a programmer myself I did not actually bother to find out whether Google can actually keep all of the information safe -- but this is another topic all together).

So in the past, what I do is simple: for major websites like Google or Facebook or QQ, I will come up with some complex passwords myself. Ultimately I remember my Gmail password in case some day I forgot the password to my Facebook account. For other small websites that I cannot fully trust I will use some prefix and postfix to the website name. Seems OK. But as I go to work, I have to deal with quite some website now -- I would not say they are not secure or something, but trusting them fully is really something I do not want to do and some websites are just too important to be given a simple password. So I need strong passwords, different passwords, and of course I need to keep them down.

A Google soon yield some great source to me: <a href="https://help.ubuntu.com/community/StrongPasswords">Ubuntu: StrongPasswords</a>. Exactly what I need!

So first need to install package apg:

~~~bash
sudo apt-get install apg
~~~

apg has two modes at the moment: pronounceable passwords and simple random character passwords.

> Default  algorithm  is pronounceable password generation algorithm designed by Morrie Gasser and described in A Random Word Generator For Pronounceable Passwords National Technical Information Service (NTIS) AD-A-017676.

This algorithm is easy to remember in a sense that you can somehow recall if you still remember the pronunciation. Demo:

~~~bash
$ apg

Please enter some random data (only first 16 are significant)
(eg. your old password):>
nighBovyib7 (nigh-Bov-yib-SEVEN)
jigMoks9 (jig-Moks-NINE)
casEtNiaft1 (cas-Et-Niaft-ONE)
edguthopLas9 (ed-gu-thop-Las-NINE)
Shuejyeeg7 (Shuej-yeeg-SEVEN)
ElWocsiarIk1 (El-Wocs-iar-Ik-ONE)
~~~

The part in the parenthesis is the pronunciation -- maybe it is because my mother tongue is Chinese and I am not good at English yet -- therefore I just do not appreciate it (pure subjective though).

The simple random character algorithm you will have more control over. Demo:

~~~bash
$ apg -m 8 -a 1
cjPL!Gwx94
9dCc2yWWE
e!~Nk0&o
_+N}{`10h'
?v`"v"/7
gkA0?J!QG
$ apg -m 8 -a 1 -M NCL
NR7HygY7
cLPYl91t
IMcdh4ow
zH9CXoYQ
zKgf8I8rr
uNkC6wpF
~~~

As you can see from the output above, this algorithm is really random -- so a lot harder to remember. But you can more control like in the second case you can ask that there must be lower case, upper case and numbers.

(-m: min-length; -a 1: use algorithm 1, which is the simple random character one; -M: mode, see man apg more more information. come on man, man is always your friend)

That is it for the password generation part. But it is impossible to remember them! And again I do not trust any so-called online password protectors and managers except Google. So I use a simple plain text file to write them down:

~~~
Website A: pass1
Website B: pass2
~~~

And zip the file with password:

~~~bash
zip -e passwords.zip passwords.txt
Enter password:
Verify password:
  adding: passwords.txt (stored 0%)
~~~

And you need to backup this file in case next time WannaCry x.0 can encrypt Ubuntu: Google Drive or Dropbox? Choose a hard-to-guess yet easy-to-remember password for yourself though!
