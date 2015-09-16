---
layout: blog_base
title: Understanding higher order functions with OCaml
category: development
tag: programming, OCaml, functional, higher-order-function
meta_desc: Learning higher order functions with OCaml, recursion, currying function, map, filter, fold and etc.
---

Higher order functions are functions that take one or more functions as parameters or return function as result. But why do we learn higher order functions? Because it is fun, no kidding but programming is fun in general--that is why you are reading this post I guess. But seriously speaking, higher order functions can make your code more concise and reusable, and they are just beautiful and elegant. So in this post I am going to talk about some notions in higher order function programming via OCaml(In case you are new to OCaml, see [intro to OCaml](/development/2015/08/28/introduction-to-ocaml-with-functional-programming/)).

First notion you need to know about is "currying":
> In mathematics and computer science, currying is the technique of translating the evaluation of a function that takes multiple arguments (or a tuple of arguments) into evaluating a sequence of functions, each with a single argument (partial application).

So there is a difference between the following 2 functions:

```ocaml
let fc1 (a, b) = a;; (* fc1 : 'a * 'b -> 'a = <fun> *)
let fc2 a b = a;; (* fc2 : 'a -> 'b -> 'a = <fun> *)
```
So the first function takes in a pair of arguments and whenever you want to apply this function you'll have to provide 2 arguments to it. But the second function takes 1 argument and returns a function that takes in one argument. Confused? See example below:

```ocaml
let fc_demo = fc2 2; (* fc_demo : '_a -> int = <fun> *)
```

So fc_demo is the returned function of "fc2 2" and it will take 1 argument and return 2 regardless of the input argument. But this is not saying every time you want to use fc2 you have to apply 1 argument and then apply another one. You can just use it like this:

```ocaml
fc1(1, 2);; (* 1 *)
fc2 1 2;; (* 1 *)
```

So you see that currying function could behave the same way as normal functions(or call them first order functions) and can also do more--for creating other functions. (Well, if you want to dig into the currying function, you will see that it is ((fc2 1) 2) with the return value from fc2 being applied to 2 immediately)
