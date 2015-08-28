---
layout: blog_base
title: Introduction to lambda calculus with fun of λ
category: development
tag: programming, lambda-calculus
meta_desc: A brief introduction to lambda calculus and a few examples with λ
---

What is lambda calculus? Well, to be honest, I am new to this too and therefore I would just quote Wikipedia regarding this:

> Lambda calculus (also written as λ-calculus) is a formal system in mathematical logic for expressing computation based on function abstraction and application using variable binding and substitution.

And why do you/we need to know about it? To quote Wikipedia again:

> Lambda calculus is taught and used in computer science because of its usefulness in showcasing functional thinking and iterative reduction

And for me, it is just elegant and powerful, sort of like the basic construction unit of everything -- everything in the cosmos.

And the basic syntax for lambda calculus is just like below:

```
t ::=                                       term
     x                                      variable
     λ x. t                                 abstraction
     t t                                    application
```

So just these 3 rules, you can define and represent all sort of things in C, Java, Haskell or any high-level programming language, you name it.

And there are only 2 rules:

1. ***Alpha Renaming***: Lambda expressions are equivalent up to bound variable renaming.

   e.g.1 λ x. x **"equivalent"** λ y. y (written as λ x.x =<sub>α</sub> λ y. y)

   e.g.2 λ y. x y **"equivalent"** λ z. x z

   (For example 1, basically x is bound variable and therefore we can simply rename it to y, or any other thing, as long as it does not conflict with other bound or free variables)
2. ***Beta Reduction***: An application(refer to the syntax definition above for what is application) whose left-hand-side is an abstraction, evaluates to the body of the abstraction with parameter substitution.

   e.g.1 (λ x. x y) z **"substitute x with z"** z y (written as (λ x. x y) z !<sub>λ</sub> z y)

   e.g.2 (λ x. y) z **"substitute x with z"** y (written as (λ x. y) z !<sub>λ</sub> y)

   e.g.3 (λ x. x x)(λ x. x x) **"substitute x with the abstraction provided"** (λ x. x x)(λ x. x x)

   (Example 1 is just a normal substitute. Example 2 is returning a "constant" regardless of the input. Example 3 is infinite loop. But it is alright to write it, cause usually we expect evaluation of lambda calculus to be lazy and therefore does not eagerly compute the result of Beta Reduction until it has to.)

In fact, that is all in lambda calculus. Yes, nothing less and nothing more. But just want to tell you a few more notions for better communication purpose(so that you do know what other programmers/mathematicians are talking about)

* ***Program*** -- expressions of lambda calculus
* ***Value*** -- final irreducible expression(cannot be further reduced by beta reduction)
* ***Scope*** -- an occurrence of variable x is said to be *bound* when it occurs in the body t of an abstraction λ x. t

So what can you do with it?

* Boolean
* Integer
* Function
* Recursion
* Data structure
* Loops(Anyway, this is just tail recursion)
* and more -- basically it is Turing-complete!

For example, boolean representation/definition using lambda-calculus:

```
TRUE := λx.λy.x
FALSE := λx.λy.y
AND := λp.λq.p q p
OR := λp.λq.p p q
NOT := λp.λa.λb.p b a
IFTHENELSE := λp.λa.λb.p a b
```

And let us just do some simple proof:

```
# TRUE AND FALSE is FALSE
(λp.λq.p q p)(λx.λy.x)(λx.λy.y)   # first term is AND, followed by TRUE and FALSE
!<sub>λ</sub> (λx.λy.x)(λx.λy.y)(λx.λy.x)   # substitute p with TRUE and q with FALSE
!<sub>λ</sub> (λx.λy.y)   # substitute x with FALSE and y with TRUE, you will get FALSE

# TRUE OR FALSE is TRUE
(λp.λq.p p q)(λx.λy.x)(λx.λy.y)   # first term is OR, followed by TRUE and FALSE
!<sub>λ</sub> (λx.λy.x)(λx.λy.x)(λx.λy.y)   # substitute p with TRUE and q with FALSE
!<sub>λ</sub> (λx.λy.x)   # substitute x with TRUE and y with FALSE, you will get FALSE
# well, of course FALSE OR TRUE is TRUE too, try that yourself. others to be verified by you too
```

Well, definition of others are more abstract and it is harder to explain here. But a link to [Wiki](https://en.wikipedia.org/wiki/Lambda_calculus#cite_note-2) if you want to read more.

Have fun coding!
