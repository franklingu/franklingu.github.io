---
layout: blog_base
title: Vagrant rsync on Windows with Cygwin settings
category: programming
tag: programming, C, MySQL
meta_desc: Set up and configure Cygwin on Windows for Vagrant(rsync not found error).
---

Vagrant is a great tool for development environment isolation(well, a more light-weighted and more popular one is Docker nowdays). But recently when I install Vagrant on Windows, I encounter an error saying "rsync not found on your path".

The possible cause of this is that only MinGW is installed on Windows but Cygwin is not. So rsync as a linux tool is not available. So the solution here is basically installing Cygwin.

* Go to [Cygwin homepage](https://www.cygwin.com/) and download setup.exe. Follow instructions and install.
* When you are choosing packages to install, search "rsync" and "openssh" since they will be used in working with Vagrant.

But after the above steps, I run <code>vagrant up</code> and still see errors "....[path] is not a file or directory" but the path does indeed exist. So I searched online and found [the issue description on GitHub](https://github.com/mitchellh/vagrant/issues/3913), which is really helpful. Then I went ahead and changed the cygdrive prefix by following [the question on stackexchange](http://unix.stackexchange.com/questions/44677/how-do-i-get-rid-of-cygwins-cygdrive-prefix-in-all-paths).

```
# go to /etc/fstab and add the following line
none / cygdrive binary 0 0
# relaunch cygwin now the path should be correct
```

References

* [blog about "rsync not found on path"](http://www.adamkdean.co.uk/rsync-could-not-be-found-on-your-path)
* [vagrant GitHub issue](https://github.com/mitchellh/vagrant/issues/3913)
* [Question on stackexchange](http://unix.stackexchange.com/questions/44677/how-do-i-get-rid-of-cygwins-cygdrive-prefix-in-all-paths)
