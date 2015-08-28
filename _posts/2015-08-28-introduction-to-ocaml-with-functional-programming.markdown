---
layout: blog_base
title: Introduction to OCaml, with brief touch on functional programming
category: development
tag: programming, lambda-calculus
meta_desc: Getting started with OCaml for non-first-time-programmers, with brief touch on functional programming
---

OCaml is not the most popular programming language without any doubt. In fact, whether it is TIOBE or PYPL or any other programming languages' popularity ranking, the most popular will be Java, C or Python or JavaScript, non-surprisingly, mostly because they are easy to learn and get started. To be fair, functional programming itself is not as straight-foward as OO or imperative programming languages. Besides, in the early days when computers were not as powerful as today, performance is another issue for adoption of functional programming languages. functional programming languages like Haskell, OCaml and Scheme are still mostly popular in academic area. However, hardwares are becoming cheaper, and human--programmers are more and more expensive(to hire). Therefore, recently functional approach is getting more attention as its declarative feature and elegance. The learning curve may be a bit steep for first time programmers, but it pays off with improvement of efficiency and easier-to-manage hude projects.

So why it is efficient? Mostly because you do not have to specify how to compute A, but simply declare that it will be A if some pre-conditions are met(so that your efforts are saved, and complexity of the program is reduced in user-readable level)(Well, functional does not mean declarative strictly speaking, but a subset). And no-side-effect will save of a lot of debugging in huge projects, where a change to a mutable will result a bug in a component 10 miles away(especially useful for concurrent programming).

Well, I am certainly not saying that functional languages will replace any popular languages. Python/Ruby/PHP/JavaScript are popular for a reason: they really really really fast to learn and use to prototype something out--you can get a fully working website with just a few commands issued in terminal and some dozens of lines of code(Well, I am intentionally omitting a very important programming idea that is behind this magic--convention over configuration, which is completely worth one or more posts to talk about). In fact, for most, if not all cases(certainly not), you will find using these untyped-or-very-weak-typed dynamic languages really powerful and capable of handling the problem you are facing. Java and C/C++ are traditional system programming languages and for various reasons(legacy code, number of good programmers available for that language, performance, community support), these languages will be popular in a very long foreseeable future.

Among functional programming languages, we have Lisp and its various dialects such as Closure, Common Lisp, Scheme. Later we had Haskell, OCaml. The most recent star in functional programming languages family should be no doubt Scala, a language with JVM as implementation base. Each of them is just fun to play with but today I am going to talk about OCaml -- the language used by Facebook to improve PHP for their development.

So, what is OCaml(let's consult Wikipedia):

> OCaml, originally known as Objective Caml, is the main implementation of the Caml programming language, created by Xavier Leroy, Jérôme Vouillon, Damien Doligez, Didier Rémy, Ascánder Suárez and others in 1996. OCaml extends the core Caml language with object-oriented constructs.

To be specific, OCaml actually supports functional, imperative and OO programming paradigms. But in most cases, people will still use functional approach as much as possible if using OCaml.

First, let's have a look at the OCaml's type system--which is one of the reasons that many people love it:
* Primitive types:
  * boolean, integer, float, char, string(mostly implemented in hardware for performance reason)
* User-defined types:
  * Ordinal type, Record type, Pointer type, Tuple type, Algebraic data type and etc.

Now here comes language construct for OCaml(expression-oriented constructs)

```
<exp> ::= if <exp> then <exp> else <exp>     # if expression
      | <id>                                 # uh, call it naming of variable for now
      | <exp>:<type>                         # type annotation
      | <exp> <exp>
        | (<exp>,...,<exp>)                  # tuple expression
      | raise <exp>
      | let [rec] <id>+ = <exp> in <exp>     # let expression/declaration
      | match <exp> with (| <pat> -> <exp>)+ # pattern-matching expression
      | try <exp> with (| <pat> -> <exp>)+   # try expression
      | ...(more are omitted)
```

(Sdaly this is not an exhaustive list. See [OCaml ref](http://caml.inria.fr/pub/docs/manual-ocaml/expr.html) for more info regarding this.)
