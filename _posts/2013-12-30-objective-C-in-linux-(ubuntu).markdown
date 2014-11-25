---
layout: blogbase
title: objective C in linux(Ubuntu)
---
After enrolling in CS3217, the first thing that I need to worry about about is in fact the programming language. In fact, after the experience with C, C++ and Java, there should not be any programming language that is particularly hard except for those functional ones which I have absolutely no knowledge of. But this time I am worried because I do not have a Mac and running OS-X in VM is definitely not a good idea for a computer as it makes the computer lag a lot. So I want to find out more on things that can enable objective-C programming in linux.

Well, it turns out that gcc compiler is able to do some of the objective-C compiling, although not full-feature. Then the next thing is to find out how to specifically carry out this.

1.Make sure the package gobjc is installed. (Or you will receive some error like this:<code>
gcc: error trying to exec 'cc1obj': execvp: No such file or directory
</code>Basically gcc is complaining that it cannot find any library for this compilation).


2.Install gnustep. (I am not really sure about this yet and I need some more digging around. But basically this will make the compiling easier and should also provide some of the library).

~~~bash
sudo apt-get install gnustep
sudo apt-get install gnustep-devel
~~~


3.After you have done the above steps, copy the following code(in case you have no idea of what this is doing now, it is simply printing out ‘hello world!’)

~~~obj-c
#import <Foundation/Foundation.h>

int main (int argc, const char * argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
    NSLog (@"hello world");
    [pool drain];
    return 0;
}
~~~

now it is time to save this as ‘hello.m'(.m is the extension for objc source code).


4.Copy and paste this line in your bash command:

~~~bash
. /usr/share/GNUstep/Makefiles/GNUstep.sh
~~~

this is the gnustep pre-processing script. there are some tutorials available to teach you how to do this manually and I suggest you can save the trouble.

After that,  do this:

~~~bash
gcc `gnustep-config --objc-flags` -lgnustep-base hello.m -o hello
~~~

if the above command does not work, most likely you have some linking problems. basically it may be because that gcc sees the library files first and ignores them, then does not know how to deal with the source code as it forgets about the library code already. so the elegant way is just to

~~~bash
gcc hello.m `gnustep-config --objc-flags` -lgnustep-base -o hello
~~~
now it should be okay.
