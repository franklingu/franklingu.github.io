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

{% highlight ocaml %}
let fc1 (a, b) = a;; (* fc1 : 'a * 'b -> 'a = <fun> *)
let fc2 a b = a;; (* fc2 : 'a -> 'b -> 'a = <fun> *)
{% endhighlight %}

So the first function takes in a pair of arguments and whenever you want to apply this function you'll have to provide 2 arguments to it. But the second function takes 1 argument and returns a function that takes in one argument. Confused? See example below:

{% highlight ocaml %}
let fc_demo = fc2 2; (* fc_demo : '_a -> int = <fun> *)
{% endhighlight %}

So fc_demo is the returned function of "fc2 2" and it will take 1 argument and return 2 regardless of the input argument. But this is not saying every time you want to use fc2 you have to apply 1 argument and then apply another one. You can just use it like this:

{% highlight ocaml %}
fc1(1, 2);; (* 1 *)
fc2 1 2;; (* 1 *)
{% endhighlight %}

So you see that currying function could behave the same way as normal functions(or call them first order functions) and can also do more--for creating other functions. (Well, if you want to dig into the currying function, you will see that it is ((fc2 1) 2) with the return value from fc2 being applied to 2 immediately)

(Side note: one of the magics that power currying function is closure: the ability to refer to parent scope variables in a child scope. As long as the child is there, the parent will not get garbage collected. See [Wikipedia](https://en.wikipedia.org/wiki/Closure_(computer_programming) for more info)

OK. that is basically all for the introduction and now we will go into the study of some higher functions.

### Map && Filter && All && Some

For those who follows ES 6, you will know there are Array.map and Array.filter now in JS Array prototype. Now we will implement these functions with OCaml. (There are List.map, List.filter and similar functions in List module. We are reimplementing all these functions for study purpose but in practice use of standard library is encouraged)

{% highlight ocaml %}
(* map is a useful function when you have a list of elements already and
   you want to apply some function to every element in the list and get
  back a list of returned values *)
let map (fn: 'a -> 'b) (xs:'a list): 'b list =
  let rec aux xs =
    match xs with
    | [] -> []
    | y::ys -> (fn y)::(aux ys) in
  aux xs;;
(* the version below makes use of tail recursion and it will be optimized
   by the compiler *)
let map (fn: 'a -> 'b) (xs:'a list): 'b list =
  let rec aux xs acc =
    match xs with
    | [] -> acc
    | y::ys -> aux ys (acc@[fn y]) in
  aux xs [];;
(* implementation of map above and here are some examples of application *)
let xs = [1; 2; 3; 4; 5];;
map (string_of_int) xs;;  (* ["1"; "2"; "3"; "4"; "5"] *)
map (fun x -> 2 * x) xs;;  (* [2; 4; 6; 8; 10] *)
{% endhighlight %}

{% highlight ocaml %}
(* filter is useful when you have a list of elements and you want to find
  out all elements that fulfill a certain condition, like is_positive *)
let filter (fn: 'a -> bool) (xs: 'a list): 'a list =
  let rec aux xs acc =
    match xs with
    | [] -> acc
    | y::ys ->
    if (fn y) then (aux ys (acc@[y])) else (aux ys acc) in
  aux xs [];;
(* if you want to explore more about functional programming, try use
  "(aux ys acc@[y])" by omitting the brackets. then you will learn the
  application of laziness in functional programming languages--you will
  still get a list containing all the desired elements, just not in the
  reversed order. laziness itself is complicated enough to  talk about in
  one whole post so I will pass it here *)
filter (fun a -> a > 2) [1; 2; 3; 4; 5];;  (* bigger than 2 *)
filter (fun a -> (a mod 2 == 1)) [1; 2; 3; 4; 5];;  (* odd elements *)
{% endhighlight %}

{% highlight ocaml %}
(* so filter can take out all disired element. but if I want something
  simple, like to see whether all elements in the list fulfill the
  requirement--that is when for_all comes in. some is somewhat similar to
  for_all except that it checks if there is at least one *)
let for_all (fn: 'a -> bool) (xs: 'a list): bool =
  let rec aux xs =
    match xs with
    | [] -> true
    | y::ys ->
    if (fn y) then aux ys else false in
  aux xs;;

let exists (fn: 'a -> bool) (xs: 'a list): bool =
  let rec aux xs =
    match xs with
    | [] -> false
    | y::ys ->
    if (fn y) then true else aux ys in
  aux xs;;
{% endhighlight %}


### Fold/Reduce
So now let us now talk about one more complex and more powerful method: fold. In OCaml list there are fold_right and fold_left for different orientation. In JS, there is much similar method called reduce(it is not really the map-reduce's reduce but works a bit similar to that). The type for fold_left: "('a -> 'b -> 'a) -> 'a -> 'b list -> 'a = <fun>"--so it basically takes in a function, an initial value to build on, a list(the list to apply fold_left on) and return a value of the same type as the initial value. As for the function it takes in as the first parameter, it will take in value from the recursion and one list element, and return a value of the same type as first parameter--and this will be used for next recursion.

{% highlight ocaml %}
(* below is one implementation of fold_left. as you can see from the function
  signature, it is very generic and can of a lot of things based on your input
  function. one really use case is to implement map/filter with fold *)
let fold_left (fn: 'a -> 'b -> 'a) (y:'a) (xs:'b list): 'a =
  let rec aux xs acc =
    match xs with
    | [] -> acc
    | y::ys -> aux ys (fn acc y) in
  aux xs y;;

let map2 (fn: 'a -> 'b) (xs: 'a list): 'b list =
  fold_left (fun xs a -> xs@[(fn a)]) [] xs;;

let filter2 (fn: 'a -> bool) (xs: 'a list): 'b list =
  fold_left (fun xs a -> if (fn a) then xs@[a] else xs) [] xs;;
(* implementations for other functions are omitted but the basic idea is that
  fold is a very generic function. this is not saying that you should use fold
  for all cases. if what you need is just map functionality, then use map and
  your code is more concise and understandable. *)  

(* fold_right is a bit different from fold_left, not just about directions of
  folding but about efficiency. as you can see from the above implementation,
  fold_left is tail-recursive and therefore could be faster than normal
  recursion.
  however, in the case of fold_right, we have save the current context for
  folding to come back from right to left, therefore resulting in a non-tail-
  recursive function *)
{% endhighlight %}

Of course higher order functions are not only restricted to lists only. You can use it from tree, graph or any data structure with elegant design. Here is just one example for tree:

{% highlight ocaml %}
type 'a tree =
  | Leaf of 'a
  | Node of 'a * ('a tree) * ('a tree);;

let map_tree (f:'a -> 'b) (t:'a tree) : 'b tree =
  let rec aux t =
    match t with
    | Leaf x -> Leaf (f x)
    | Node (x,lt,rt) -> Node (f x,(aux lt),(aux rt)) in
  aux t;;

(* one application of map_tree *)
let t1 = Node (3,Leaf 1, Leaf 2);;
let t2 = Node (4,t1,Leaf 6);;
map_tree (fun x -> x + 2) t1;;
map_tree string_of_int t2;;
{% endhighlight %}

There is just so much to explore about higher order functions for you to explore. Have fun coding ;P
