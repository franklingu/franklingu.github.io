---
layout: blog_base
title: Setup Oh-my-zsh on Ubuntu without sudo
category: programming
tag: Python
meta_desc: Setup oh-my-zsh on Ubuntu without sudo--installing zsh to home directory, modify PATH and change shell to zsh at terminal startup.
---

[Oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) is a command line terminal tool that is designed to improve terminal users' productivity and it is based on zsh. And zsh contains nearly all of the syntax in Bash and functionality but added a few helper features to make it awesome. Another similar improment is [fish](https://github.com/fish-shell/fish-shell) but it contains quite some incompatability with normal Bash. So if you want friendliness with Bash and interactiveness and coolness, go for oh-my-zsh.

To setup oh-my-zsh, the first thing is to have zsh. This is fine for most of the Ubuntu setup but I happen to have one with out zsh. (curl or wget, and git is a must, can install them the similar way but usually they are just around already).

So the machine I am working on does not allow me to sudo--too bad but things are just fine, only a bit hassel yet definitely manageable.

Installing zsh:
1. Go to [zsh download page](http://zsh.sourceforge.net/Arc/source.html) and download the src as needed.
2. `tar -xzf zsh-5.2.tar.gz` to extract the src.
3. Read the README and INSTALL and possibly MACHINES. On Ubuntu, you can just go to INSTALL and see how to install it.

~~~bash
# of course you can change the path to somewhere else you want zsh to be installed
mkdir -p ~/.bin/zsh
cd ~/.bin/zsh
./configure
make
make check
make install
~~~

Now since I do not have sudo, I can only change defaut shell from bash to zsh, so I switch shell from bash to zsh upon start:

~~~bash
# Execute zsh upon login
export SHELL=$HOME/bin/zsh
exec $HOME/bin/zsh -l
~~~
add the code block above to ~/.bashrc and default shell bash will switch to zsh upon start.

Installing oh-my-zsh:
`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`

After running the command, I saw this code got executed:
~~~
      printf "I can't change your shell automatically because this system does not have chsh.\n"
      printf "${BLUE}Please manually change your default shell to zsh!${NORMAL}\n"
~~~

But do not worry, I have changed the shell to zsh. This step fails because I do not have sudo privilige.

Now you can go through normal configuration with oh-my-zsh and enjoy its awesomeness.

Note:
1. Change your terminal's encoding to UTF-8. Without this you may see garbage output--and it it the most widely used encoding anyway.
