---
layout: blog_base
title: Common Python Gotchas
category: programming
tag: Python
meta_desc: Common Python Gotchas--a list of commonly made mistakes by new Python programmers
---

Python is great because of many reasons and probably the reason is different for each Python lover--for me it is the elegance of the language that makes me fall in love with this at my first encounter. Being easy to pick up and understand, it is also getting an increasing attention as the first programming language for students. There will be more and more Python lovers. But before we commit ourselves to some serious Python code, we should at least know about the common gotchas for easier life when playing with Python.

* **Multable Default Argument**<br>
  If there is one mistake that is most likely to trick most of the new Python programmers, I guess it would be this one. So basically when should provide a default argument to a function, that argument is mutable and the change to the argument will affect next invocation. Consider the following code snippt:
  {% highlight python %}
  def append_to(element, to=[]):
    to.append(element)
    return to

  my_list = append_to(12)
  print(my_list)
  # [12]

  my_other_list = append_to(42)
  print(my_other_list)
  # [12, 42]
  {% endhighlight %}
  So basically what happens here is that my_list and my_other_list as referring to the same "to" default parameter. So we first append(12) and then append(42)--of course we will have [12, 42] in the end of execution.
  
  Basically this behaviour is not unexpected if you understand the fact that parameters are evaluated only once when functions are first loaded. When Python interpreter first discovers the function, the default parameter is evaluted and created. If it is an immutable variable, then it does not matter since we cannot change it anyway. But if it is a mutable variable, later any modifications will be made to the one and the only one copy.

  Recommended:
  {% highlight python %}
  def append_to(element, to=None):
    if to is None:
      to = []
    to.append(element)
    return to
  {% endhighlight %}
  So why do we have this tricky thing in Python? Turns out that this "mutable default argument" is really useful when it comes to implementing cache-like functions--previous inputs will be remembered without using dirty global variables.

* **Referencing in closures**<br>
  Lambda is a handy way of providing function as argument and therefore it is used a lot in Python. But there is one mistake that many new Python programmers do not get: variables in closure only get evaluated at the time of execution. See the example below:
  {% highlight python %}
  def create_multipliers():
    return [lambda x : i * x for i in range(5)]

  for multiplier in create_multipliers():
    print multiplier(2)

  # [8, 8, 8, 8, 8]
  {% endhighlight %}
  
  This behaviour aligns well with the Pythonic way, and aligns with nearly all other languages with support for closure--function in an enclosing scope can access variables in enclosing scope, and get the value when it is being called/executed--late and lazy--instead of when the inner function is defined. the name "i" refers to some object reference, until the time of execution, the name "i"'s corresponding object reference does not matter. At the time of execution, the name gets looked up and resolves to an object reference.
  
  (Lambda is introduced in Java 8, and all enclosing variables are "final"--meaning that they are supposed to be constant. This is because objects only get resolved at time of execution so order matters if any object is mutable--some other thread may just kick and change the value--one of the reason Java is reluctant to bringing in lambdas. As for languages like Python and Ruby, they are effectively single-threaded because of GIL(I am talking about CPython and general Ruby) so there is no real concurrency. Languages like Lisp, variables are not mutable anyway.)
  
  As explained before, the name "i" is an enclosing variable. So it is not evaluated until the lambda functions get executed. But clearly before the execution, the iteration has ended and "i" is 4 already. To avoid this, we can use argument for lambda like this:
  {% highlight python %}
  def create_multipliers():
    return [lambda x, i=i : i * x for i in range(5)]
  {% endhighlight %}
  So now the "i" inside lambda body is an argument instead of an enclosing variable. Each iteration "i" will be passed in as an argument and the binding happens as just expected.

* **Use of docstring**<br>
  Docstring is for documentation purpose--not block level comment. So see the example below:
  {% highlight python %}
  t = {
      """
      this is test docstring
      """
      'test1': 1,
      'test2': 2
  }

  print(t)
  {% endhighlight %}
  So instead of <code>{'test2': 2, 'test1': 1}</code>, we see <code>{'test2': 2, '\n\tthis is test docstring\n\ttest1': 1}</code> printed out. So docstring is named as "doc"string for a purpose. And what is more, try not to use block comment as much as possible--you may accidentally comment out important code.

* **Assignment of non-local variable**<br>
  It is true that Python has enclosing variables--so you can just refer to variables in outer scope. However, when it comes to assignment, things get a bit tricky.
  {% highlight python %}
  x = 10
  def foo():
      print x
      x += 1
  foo()
  {% endhighlight %}
  And you will get an UnboundLocalError--because *when you make an assignment to a variable in a scope, that variable becomes local to that scope and shadows any similarly named variable in the outer scope.* You can use "global" key word to indicate that x is defined globally already and assign to x after that declaration.

  Notice that for Python 3, we have another keyword "nonlocal" to indicate that a variable is in the enclosing scope and we can reassign to that
