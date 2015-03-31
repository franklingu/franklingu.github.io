---
layout: blogbase
title: Learn objective C basics with highlights from a C++ programmer
category: programming
tag: obj-C
---
Honestly I am not an experienced C++ programmer. And my knowledge  of C is also limited. But knowing C++ and C is just some form of help and distraction at same when I am starting learning objective C. Although personally I believe the only reason why objective C is popular is only that Apple is pushing it and I do not think this will last for long, I have to pick it up since I have to take CS3217 this coming semester.

First, at the first glimpse objective C is just like C++: both are a superset of C, although not exactly; following the C style syntax, although objective C in my opinion is more bizarre; both come with the power of efficiency and also at the price of the headache when dealing with memory management.

Let us just jump to classes in objective C(I am really sick of those books starting with if-else and not effectively telling the users anything important about the language.)

Inside obj.h file(this should be strange to Java users as in Java everything is done in one  java file. As a programmer in C++, I find this idea practical and useful when it comes to big classes and what is more important, this approach is more “OO” since for a user of this class, all you have to do is just a look at the header file without knowing the actual implementation. Besides these reasoning, since C is using *.h too, I think historical reasons also contribute a lot–in big C projects usually the function prototype declarations are in a separate .h file although not compulsory.)

~~~obj-c
//notice that here this interface does not mean the common-sense interface
//which are practically abstract classes to be implemented but just 
//class declaration
@interface FooObject : NSObject {
//attribute declaration
//@public @private or @protected for access control
}
//method declaration
//+ for class method
//e.g. one common one:
//+alloc;
//which is quite like new in C++(you can also say it like in Java, but 
//the thing is Java is taking the reference by default but in obj-C and C++
//it is like pointer)
//- for instance method
//e.g.1
//-init;
//uh, hard to explain this one, it will come back later
//-age;
//getter--notice the way of get declaration
//-setAge:(int)age;
//and this is one of reasons why it is bizarre
//more on this will follow
//and for objective C 2.0 the powerful @property and @synthesize
//can save some trouble of typing
@end
so once we are done with the header file, it is time for us to move on to .m file which is the implementation file

//here comes the implementation of the header file,
//not sure if it is required but it is just a common practice to give the
//two files the same name like foo.h and foo.m
//and remember to import and the header file
@implementation FooObject
//method implementation
@end
~~~

Understanding the use and the importance of message in objective C is very important. Although we do not call message “invoking method” but it seems they are effectively the same thing.

```
Student *stu = [[Student alloc] init];
```

so the above line allocate a Student object (on heap and if you do not know the difference between heap and stack, you can search online or just ignore this for now) and store the starting address of the object in stu (on stack) which is a pointer(pointer is powerful and dangerous. Java programmers never have to worry about it because the similar stuff is managed by the compiler.)
