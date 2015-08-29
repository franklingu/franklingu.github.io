---
layout: blog_base
title: Introduction to OCaml, with brief touch on functional programming
category: development
tag: programming, OCaml, functional, tail-recursion
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

Since we are talking about OCaml as functional programming language, we will first see how to define a function

```ocaml
let max (x, y) = if x<y then y else x;;
(* max is of type 'a * 'a -> 'a = <fun>, which means it is a function that
takes a pair of values and return one value. All of these three are of
generic type. But take a notice here, 'a must has < operator defined on it *)

let rec fact n:int = if n==0 then 1 else n*(fact (n-1));;
(* fact is of type int -> int = <fun>. Although I put a type annotation here,
it actually is of no use here as if you look inside the function, we are
comparing n with 0 with == operator, which infers that n must be an int.
Type inference is really a handy way for programmer to save their effort.
You will see that many other languages like Scala and Apple's Swift are
influenced by this. rec means this is a recursive function. Normal function
can only be used after its definition, while rec function can be used inside
its own body *)
```

Another useful technique in OCaml is pattern matching thanks to its great type system. Here is an example:

```ocaml
type 'aa btree = Leaf of 'aa | Node of 'aa * ('aa btree) * ('aa btree);;
let rec height t =
    match t with
    | Leaf _ -> 1
    | Node(n, lt, rt) -> max(height lt, height rt) + 1;;
(* here  we first defined type btree--it either a leaf or node of value
and left tree and right tree. in height, we are matching t with 2
patterns: if it is just one leaf, return 1; if it is a node of left
tree and right tree, compute max--the one we defined previously of
height of left tree and right tree and add 1 to it. *)
```

In some sense, pattern matching is really similar to try expression in OCaml in terms of syntax. So I guess basically you get how to write try expression in OCaml.

There are no loops in OCaml--every loop can be rewritten as recursion. Although someone may argue that maintaining a stack of function calls is expensive--it is surely more expensive than a loop which requires constant space only. But it does not mean you have to live with the inefficiency in OCaml. Good compilers, OCaml compiler included, can do something called tail recursion optimization--effectively translating tail recursion into a loop.

(Honestly, in pure functional programming language there will never be a loop--although theoretically you can use loop in OCaml, but you are using other programming paradigms other than functional. One essential element in loop is use of mutable variable as some sort of counter, whereas in functional programming language everything is immutable)

What is tail recursion? A function is tail recursive if the last operation in recursive branch is the recursive call. Let's see an example:

```ocaml
let fact_non_tail n =
    if n==0 then 1 else n * fact_non_tail (n - 1);;
(* this is a non tail recursive function because after coming
back from recursive call we will still do multiplication.
Therefore in this case OS has to remember the context of current
function call to compute multiplication *)

let fact_root_call n =
    let rec fact_tail(n, res) =
        if n==0 then res else fact_tail((n - 1), n * res)
    in if n==0 then 1 else fact_tail(n, 1);;
(* the inner function fact_tail is a tail recursive function as
recursion is the last thing to do in recursive branch. This can
be effectively optimized as a steady stack space loop. *)
```

Does that mean all in OCaml. Of course not. Here is just something to get you started--in fact, you can already handle pretty much with just these. Have fun functionaling :P
