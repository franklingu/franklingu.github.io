---
layout: blogbase
title: Summary of functional-javascript-workshop
category: programming
tag: JavaScript, functional
---

This blog post is about functional-javascript-workshop, a workshop provided in [nodeschool](http://nodeschool.org). You can just type <code>sudo npm install functional-javascript-workshop -g</code> to install it

JavaScript is small but not as easy as it seems. This has been said by many but until I get to functional javascript, I sort of understand the essence of this saying. But someone may argue that it is not JavaScript that is hard to get but the notion of functional programming is not something you can just pick up overnight through a few online courses only. I agree that functional programming is not easy, but the design of JavaScript's expressiveness is effective such that it supports prototypal inheritence and functional programming well, which shows its power. So by reading jQuery's docs and manipulating DOM structure or doing Ajax is not called "using JavaScript", at least not a full JavaScript programmer yet. Using prototype.js and writing functional code is the sign that you are getting somewhere as a JavaScript programmer.(I am not a good JavaScript programmer yet but I do not think anybody overlooking these two aspectes of JavaScript's use is able to master it)

The reason why JavaScript is capable of doing functional programming lies in the design that it views functions as "first-class objects"--that means functions are like other objects and therefore you see attributes like length, arguments, etc. and methods like bind, call and apply. The only special part about function when compared to normal objects is it is callable--meaning that you can append brackets and execute it. Languages like Python can just do the same because of the same reason, although subtle differences may exist.(Sadly I am not well versed enough to know yet)

If you want to know more detailed explanation about this, you'd better Google it yourself but I personaly believe that the best way to learn programming is by programming itself and therefore I would introduce functional-javascript-workshop.

After installing the module globally(node and npm of course are the pre-requisites and the -g flag is also vital when installing), you can just type <code>functional-javascript</code> to view the challenges and conqure them.

A list of all the challenges:

1. Hello World(Just a basic warm-up, use of first-order functions only)

2. Higher Order Functions(First contact with functions-as-arguments functions)

3. Basic: Map(Learn about Array.prototype.map. Map takes in a callback function as the parameter, and the callback should take an item as parameter and the return value will be the item in the newly created array. In this way the old array is one-to-one mapped to the new array. Although not used in this question, index is also supplied as the second argument to the callback function. You can also visit Mozilla for more info and the same applies for the following.)

4. Basic: Filter(Learn aobut Array.prototype.filter. Filter is like map but instead of return the item in the newly created array, the callback function should return true for keeping the item in the returned array and false for otherwise. So the returned array is the a shorter one with some items filtered out from the original array. This exerice also combines the prev one by making the format of message weird so that you have to use map to preprocess items in given array first--of course, this is not required, all roads lead to Rome)

5. Basic: EverySome(Still about methods in Array: every and some. These two methods are like sisters: a callback function as parameter and the callback function will take the item as argument and return boolean value. However, for every, the return value is only true if all items are true according to the condition supplied in callback function but for some, as long as there is at least one item satisfying the condition, the return value will be true. The question is asking about "for all" and "there exists"--basic discrete math will do)

6. Basic: Reduce(So far the most "complicated" method: a callback and an optional initial value. The callback function takes in 4 arguments: prev, curr, index and arr(the array itself). But it is not complex. Just a while and you will get it--prev is the previously returned value or initial value/first item for the first call; curr is the current item; index is the index and arr is itself)

7. Basic: Recursion(This is asking you to implement reduce using recursion. Anyone who knows imperative programming langueages like C will not have any trouble getting a pass. However, take a notice that the supplied solution is way much cooler, making use of IIFE--immediately invoked function expression [See Example 1](#example-1). "reduceOnce" itself calls itself with incremented idx, return value of callback until function execution reaches terminating condition)

8. Basic: Call(Practice of call and apply. More information of call and apply can be found on Mozilla website. One example of using call would be Array.prototype.slice on function arguments. Arguments it array like but it does not have slice method as it is not a real array. However, Array.prototype.slice.call(arguments,...) will be just like calling slice on arguments. Apply is like call except that it expects all parameters packed up in an array as one param)

9. Partial application without bind(JavaScript is dynamic-typing language and its function can take any number of parameters. Therefore, we do not and in fact cannot talk about function overloading. However, partial application is one nice trick provided by JavaScript, which is very neat and useful. The idea is wrapping a function with an outer scope, therefore fixing some parameter/s with convenience. The returned function will have reference to outer scope and therefore outerscope will live until the returned function dies--so although its neatness, partial application may bring in memory leak because of circular reference)

10. Partial application with bind(Bind is binding a function on an object and return the bound function--the returned function will always be invoked on the object no matter in which context the bound function is called. More info about bind on Mozilla)

11. Implement map with reduce(Well, "map" "reduce"--talking about Hadoop? No. Understanding of reduce and map is important in this)

12. Function spies(Adding functionality to a method--first extracting the method and then re-assign a new function to the object. Inside the new function extra stuff besides applying the original method is done.)

13. Blocking event loops(Node is single threaded in some sense--if you keep the main thread busy, new events cannot be fired because main thread is not able to pay attention to other stuff at the same time. setTimeout with a small amount may give it a break)

14. Trampoline(Recursion may cause a stack overflow if called many times. So the idea of trampoline is to modify the recusion function to return next step and return null if execution is done)

15. Async loops(Power of asyncronous callbacks)

16. Recursion(Exercise of recursion)

17. Currying(Flexible number of levels of partial applications)

18. Function call(Clever trick of bind and call)

Well, those are all for functional-javascript-workshop. Of course by just going through a series of exercises does not make you a good JavaScript programmer. And functional programming is also more than a few lines of coding. There is one recommended book on functional programming in JavaScript(Functional JavaScript--O'Reilly), one book on JavaScript(JavaScript: the good parts: by Douglas Crockford) and one book about functional programming(The little Schemer--MIT)

<hr>
<a name="example-1" class="example-anchor">Example 1: </a> an example of IIFE in the exercises

~~~javascript
function reduce(arr, fn, initial) {
  // the solution below work exactly like array.reduce with supplied initial.
  // also google immediately-invoked function expression (IIFE) for another elegant js feature
  return (function reduceOnce(idx, prev) {
    if (idx >= arr.length) {
      return prev;
    }
    return reduceOnce(idx + 1, fn(prev, arr[idx], idx, arr));
  }(0, initial));
}
~~~

The code above first defines an inner function reduceOnce and immediately invokes the inner function by using **(**function () {}***()*****)** IIFE format
