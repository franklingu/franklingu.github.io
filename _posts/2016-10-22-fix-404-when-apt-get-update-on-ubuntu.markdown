---
layout: blog_base
title: Fix 404 error on Ubuntu when trying to update and upgrade
category: programming
tag: Python
meta_desc: Fix 404 not found error on Ubuntu old releases when trying to update and upgrade.
---

Linux is great. And for those who come from Windows background and want to have a smooth transition, Ubuntu seems like the most suitable choice to dive into the Linux world. I moved from Windows to Linux about 3 to 4 years ago as I want to learn more about Linux administration. So I first chose Ubuntu as the distribution to get started with Linux. The overall user-experience is great. I have the convenience of working with a similar environment with web servers--setting up development environment has never been so easy. And I have a pretty good GUI as well. Probably the only thing missing in OSes other than Windows is the power of gaming--but I do not play PC games anyway.

So first I was using 12.04 and then I moved to 14.04 to enjoy some updated features. To be honest I do not have much idea about versioning at that time. Now the latest LTS is 16.04 and I am facing the problem of dist-upgrade. But this time I decided that I should just wait for a while until things are more stable, and I want to keep my own OS the same as the one used at work for ease of development. So anyway, this time I did not upgrade to a newer version.

And then someday, when I try to use `sudo apt-get update` and I got some "404 Not Found" errors. I chose to let it go cause I thought it is just some network error(at night the network in Singapore is just so freaking bad at times). But I keep getting this error after and I decided to look it up.

So it turns out that it is me who did not pay attention to the meaning of "Long Time *Support*". So Ubuntu community will actively support my 14.04 OS and up to some point, it is not actively supported. So it was still actively supported, Ubuntu packages can be downloaded from "archive.ubuntu.com" and "security.ubuntu.com". But when a new LTS is released and the old one is no longer actively supported, the OS needs to find its package at "old-releases.ubuntu.com". After getting this clear, simply do the following will fix the error:

~~~
sudo sed -i -e 's/archive.ubuntu.com\|security.ubuntu.com/old-releases.ubuntu.com/g' /etc/apt/sources.list
~~~

Tada, you are free to run update and upgrade again to keep your old OS and enjoy updates. But you are ready, be sure to move to 16.04 to enjoy Python3, ZFS, hot patches and many more features.

References:
1. [AskUbuntu question](http://askubuntu.com/questions/549777/getting-404-not-found-errors-when-doing-sudo-apt-get-update)
2. [How to fix Ubuntu/Debian apt-get 404 Not Found Package Repository Errors](https://smyl.es/how-to-fix-ubuntudebian-apt-get-404-not-found-package-repository-errors-saucy-raring-quantal-oneiric-natty/)
