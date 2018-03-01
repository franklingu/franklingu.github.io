---
layout: blog_base
title: Setup Oh-my-zsh on Ubuntu without sudo
category: programming
tag: Python
meta_desc: Setup oh-my-zsh on Ubuntu without sudo--installing zsh to home directory, modify PATH and change shell to zsh at terminal startup.
---

[Oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) is a command line terminal tool that is designed to improve terminal users' productivity and it is based on zsh. And zsh contains nearly all of the syntax in Bash and functionality but added a few helper features to make it awesome. Another similar improment is [fish](https://github.com/fish-shell/fish-shell) but it contains quite some incompatability with normal Bash. So if you want friendliness with Bash and interactiveness and coolness, go for oh-my-zsh.

To set up oh-my-zsh, the first thing is to have zsh installed on your computer. This is easy for most of the Ubuntu setup -- if you have `sudo` privilige. What if I do not have sudo privilige and I want to install zsh or upgrade to a newer version? (There are other dependencies such curl or wget, and git -- especially git. I think most Linux distros should have these preinstalled and version does not really matter here in most cases).

So the machine I am working on does not allow me to sudo--too bad but things are just fine, only a bit hassel yet definitely manageable.

Installing zsh:
1. Go to [zsh download page](http://www.zsh.org/pub/) and download the src as needed -- or use *wget*: `wget http://www.zsh.org/pub/zsh-5.4.2.tar.gz`. (zsh was hosted on sourceforge as well. On 2018 Match 1, sourceforge seems still under maintenance though.)
2. `tar -xzf zsh-5.4.2.tar.gz` to extract the src.
3. Read the README and INSTALL and possibly MACHINES. On Ubuntu, you can just go to INSTALL and see how to install it.

~~~bash
# Download and extract
wget http://www.zsh.org/pub/zsh-5.4.2.tar.gz
tar -xzf zsh-5.4.2.tar.gz
rm zsh-5.4.2.tar.gz
cd zsh-5.4.2

# I will install to $HOME/local -- change it to suit your case
mkdir ~/local
# check install directory
./configure --prefix=$HOME/local
make
# all tests should pass or skip
make check
make install
~~~

Now since I do not have sudo, I can only change defaut shell from bash to zsh, so I switch shell from bash to zsh when executing .bashrc:

~~~bash
echo "export PATH=$HOME/local/bin:$PATH" >> ~/.bashrc
echo "exec zsh" >> ~/.bashrc
# and then restart shell
~~~

Installing oh-my-zsh, the recommended command is: `sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`. But we do not have sudo, and most importantly we do not have zsh installed to /etc/shells -- so if you check the script, it is definitely not going to work. For example, `CHECK_ZSH_INSTALLED=$(grep /zsh$ /etc/shells | wc -l)` will be empty as zsh is not under /etc/shells. So we need to change some part of the script:

~~~bash
# switch to zsh first
exec zsh
curl https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sed -e 's/grep\ \/zsh\$\ \/etc\/shells/which zsh/g' | zsh
~~~

Now you can go through normal configuration with oh-my-zsh and enjoy its awesomeness.

Note:
1. Change your terminal's encoding to UTF-8. Without this you may see garbage output--and it it the most widely used encoding anyway.
