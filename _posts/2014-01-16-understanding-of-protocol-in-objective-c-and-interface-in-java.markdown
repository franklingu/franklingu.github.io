---
layout: blogbase
title: Understanding of protocol in objective C and interface in Java
---
~~~obj-c
@interface XYZPerson : NSObject{
}

//methods
@end
~~~

This is an example of the use of interface in objective C, which is like interface in C++. We do not have "interface"(java) in C++ -- that sounds weird, we are just defining a public "face" of a class. People from outside will know the person(class) by the face(interface) and therefore implementation(what is underneath the face) can be easily changed if we want. It does not matter who the person really is but what matters is what the person looks like :P

while in Java, interface means a set of methods which need to be implemented. Same word used in two languages and the meaning is not even close :P

and the equivalent idea in objective C will be protocol.

~~~obj-c
@protocol XYZ_comparable
// required methods and optional methods
@end
~~~

to use this, you have to

~~~obj-c
@interface XYZComparablePerson : XYZPerson (XYZ_comparable)
// inherited from XYZPerson and also supposed to implement the required methods in
// XYZ_comparable
// optional methods are optional to implement--of course, optional means optional :)
@end
~~~

So, to sum up, interface in java is equivalent to protocol in objective C while interface in objective C is just class public definition like what is in C++.

When I was first introduced to the idea of interface in Java, the differences between Abstract Class and interface -- especially when to use which seemed to be the hard part. Here are some notes since we are talking about interface:

1.use abstract class when the req is such that we need to implement the same functionality in every subclass for a specific operation(implement the method) and diff functionality for some other operations(only method signatures)

2.use interface if u need to put the signature to be same(and implementation diff) so that u can comply with interface implementation

3.we can extend max of one abstract class ,but can implement more than one interface

one more important point:
Abstract Class is supposed to be used when objects are more related but interface will apply to those that are not tightly related.

in objective C, you do not have abstract class at all. so no comparison here.

some on Abstract Class and interface in Java:

http://stackoverflow.com/questions/10040069/abstract-class-vs-interface-in-java
