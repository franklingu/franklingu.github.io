---
layout: blog_base
title: Make your Linux terminal visually appealing
category: programming
tag: Linux
meta_desc: Transform your Linux terminal visual appealing with use of oh-my-zsh, htop, ranger, most and so on.
---

Linux has been capturing a larger market share with its heavy use in servers and the increasing trend of cloud infrastructure. As a developer, as long as your are tied tightly to Windows technology stack, you may probably go for Mac or some Linux machine (Windows is transforming and embracing Linux as well--we see more open source effortS like .Net for Linux, .Net core open source and bash for Windows and support for Ubuntu in Windows 10 natively). Mac is based on BSD and its user-interface design is pretty good already (you can argue it is the best). However, even for the most popular Linux distribution Ubuntu, the UI... Well, guess most of the users of Linux systems so far are still programmers and we should care less about the look? I beg to differ as a programmer. For terminals, I guess properly and constantly color-coded display is definitely better than a huge chunk of white characters piled together on top of some black background.

So therefore we are going to make the terminal more fun to work with and more appealing visually as well.

1. [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)<br/>
   I guess only very few of us need to care so much if we are using bash and zsh. Zsh is not strictly the super-set of bash but the most portion of two of them are identical. So switching to zsh should be a problem to most of us, or just all of us in nearly all the cases. By switching, you can already enjoy some benefits like more powerful auto completion. But we can make it look better by install oh-my-zsh--there are just tons of themes to choose from and there will be a good fit for you. With some plugins, you can be more productive as well when working with the tools that you usually play with. I have been recommending this for some times but I see that still some of my friends do not know the existence of such a fantastic tool.

   The installation link is just as above.

2. [htop](https://en.wikipedia.org/wiki/Htop)<br/>
   "top" is the default system monitor installed and it looks plain and dull (and for some reason, I do not understand why some figures showing on my 16-CPU machines are weird). Luckily we can simply install "htop" by `sudo apt-get install htop` and get a much colorful and interactive view of the system.

   Use the command above and you are just good to go.

3. [ranger](http://ranger.nongnu.org/)
   A lot of times we need to browse files in some folder. For this purpose we may use the GUI--but that requires switching the program and maybe some clicking--which will just slow us down. Of course we can use "ls" + "vim" to see what is in the folder and look into the content. With just ranger, we can browse files and sub folders easily. And it leverages the power of direction keys, saving the trouble of using mouse at all.

   [A tutorial on DigitalOcean](https://www.digitalocean.com/community/tutorials/installing-and-using-ranger-a-terminal-file-manager-on-a-ubuntu-vps) is a good guide to installation and usage of ranger.

4. [most](http://linux.die.net/man/1/most)
   Depends on your bashrc--if you are using bash or zshrc if you are using zsh, you can set "PAGER" by "export PAGER=less"(I guess most Ubuntu comes with less as the standard pager). Except for performance reasons--which I just doubt would ever be a reason on development machine, "less" is always more than "more". "most" is supposed to be a super-set of less for display, by missing some functionalities ([A question on unix stackexchange](http://unix.stackexchange.com/questions/604/isnt-less-just-more))

   Use `sudo apt-get install most` and add `export PAGER=most` to your shell configuration file and restart your terminal.

There are more tools like these to make the terminal a more fun place to work with I believe. I will add more later when I find more stuff. Anyway, this post should give you a good start to make your terminal artistic and pretty.
