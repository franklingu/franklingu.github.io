---
layout: blog_base
title: Learning smart pointers in C++ and Rust
category: development
tag: programming, C++, Rust, memory-management, pointer
meta_desc: Comparing smart pointers in C++ and pointers in Rust. Getting more about how smart pointers work and how to manage memory smartly and efficiently
---

Recently I have to reading about how memory management is done in Rust, in order versions(Rust 0.8) and get really interested in smarter pointers' notion(although coming from C++ background, I do know what smart pointers are and why to use them, it was not until knowing Rust that I started to looked at this seriously). And here are some recommended posts from me:

1. [Overview of memory management in Rust](http://pcwalton.github.io/blog/2013/03/18/an-overview-of-memory-management-in-rust/)
2. [Rust book](https://doc.rust-lang.org/book/the-stack-and-the-heap.html)
3. [Pointers in Rust](http://words.steveklabnik.com/pointers-in-rust-a-guide)
4. [Understanding borrowed pointers](http://static.rust-lang.org/doc/0.8/tutorial-borrowed-ptr.html)

Seems that right now in Rust we do not explicitly talk about different types of pointers anymore. Instead, important notions have been introduced into the language: ownership and lifetime--[Rust book chapter about ownership](http://doc.rust-lang.org/book/ownership.html). However, under the hood we can still use smart pointers like unique pointers, shared pointers, weak pointers and etc. for better understanding memory management.

Well, if you are someone who knows Rust but does not know C++, at least C++ 11, you may not really get what is unique pointer and similar notions I have listed above. That is because I am using C++'s way of calling those pointers. Many people like to compare Rust with C++ as they are just alike in many perspectives. In fact, in Rust 0.8 the pointer system is so much like C++. Both of them are designed with runtime efficiency in mind and as C++ evolves, safe coding has been promoted more and more instead of simply just optimizing for performance--and safety is one of the core values in the design of Rust. (I am not a language specialist and therefore I will not go into much details of this discussion [A question on Quora](https://www.quora.com/What-do-C-C++-systems-programmers-think-of-Rust)).

What are smart pointers and why to use them? See [Wikipedia](https://en.wikipedia.org/wiki/Smart_pointer)
> A smart pointer is an abstract data type that simulates a pointer while providing additional features, such as automatic memory management or bounds checking. These additional features are intended to reduce bugs caused by the misuse of pointers while retaining efficiency. Smart pointers typically keep track of the memory they point to. They may also be used to manage other resources, such as network connections and file handles.

C++ has auto\_ptr even before 11 came along, which is supposed to make life easier for programmer to deal with pointer deallocation with little effort(the only effort is to understand it first). In fact, Boost(THE famous C++ library) has been working on smart pointers long enough--see [Boost smart pointers doc](http://www.boost.org/doc/libs/1_59_0/libs/smart_ptr/smart_ptr.htm). However, it was not until C++ 11 that RAII and smart pointers have really picked up(arguably true, but C++ 11 really encourage programmers to be freed from managing all pointers deallocation in trade of some performance overhead). Here are some posts that I personally recommend:

1. [MSDN post about smart pointers](https://msdn.microsoft.com/en-us/library/hh279674.aspx)
2. [A tutorial from University of Michigan](http://www.umich.edu/~eecs381/handouts/C++11_smart_ptrs.pdf)
3. [C++ references about memory library](http://en.cppreference.com/w/cpp/memory)

To understand how unique\_ptrs are implemented and get what is mechanism behind its power, you need to first understand the difference between stack and heap--[Rust book chapter about stack VS heap](https://doc.rust-lang.org/book/the-stack-and-the-heap.html). And whatever is on stack will be destroyed once it is "[out of scope](http://stackoverflow.com/questions/13888268/what-happens-when-a-variable-goes-out-of-scope)". So unique\_ptr will utilize this mechanism--when the unique\_ptr is out of scope, the destructor will be invoked in which free of the raw pointer that it wraps in will be done. In this way, programmers are not required to write free or delete before some function ends.

As for shared\_ptr, it is somehow more complicated as it has to keep track of how many references are currently pointing to it and free itself once reference count drops to 0. Much similar to how [ARC](https://en.wikipedia.org/wiki/Automatic_Reference_Counting) should behave in objective C. And to complete this idea, there is another type called weak\_ptr, which means point to some shared\_ptr but does not increase reference count. This is also similar to weak reference in objective C, mainly to avoid [reference cycle](https://www.quora.com/Apple-Swift-programming-language/What-is-a-strong-reference-cycle). A great blog explaining about shared\_ptr in [MSDN](https://msdn.microsoft.com/en-us/library/hh279669.aspx) and [C++ ref](http://www.cplusplus.com/reference/memory/shared_ptr/).

Well, there is question on [stackoverflow talking about smarter pointers in C++](http://stackoverflow.com/questions/106508/what-is-a-smart-pointer-and-when-should-i-use-one) and [Boost guide on how to use smarter pointers](http://www.boost.org/doc/libs/1_59_0/libs/smart_ptr/sp_techniques.html) for you to learn more about smart pointers.

So, if you have gone through all of the knowledge covered above, you will mostly get how Rust manage pointers for safety reason now.

Have fun exploring:P
