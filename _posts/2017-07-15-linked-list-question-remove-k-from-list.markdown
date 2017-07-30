---
layout: blog_base
title: Linked List Question -- remove k from a list
category: programming
tag: algorithm
meta_desc: remove value k from a linked list, the "removeKFromList" question and analysis
---

So recently I started to be an interviewer myself and therefore I am doing some recap of interview questions.

So far I have been using linked list related questions in the interview? Why, because I think this way I can see whether the candidate is careful enough -- because the role that is in need in my company at the moment requires a lot of attention to details. Knowledge on trees and graphs is not needed. So linked list, with its simplicity, and some tricky parts that those candidates need pay attention to, is a great data structure to ask during an interview.

So I started with a basic one: what is a linked list?

> In computer science, a linked list is a linear collection of data elements, called nodes, each pointing to the next node by means of a pointer. It is a data structure consisting of a group of nodes which together represent a sequence.

And how do you define one ListNode?

~~~python
class ListNode(object):
    def __init__(self, val):
        self.value = val
        self.next = None
~~~

And let us begin with a question (taken from (codefights)[https://codefights.com/]):

~~~
Given a singly linked list of integers l and an integer k, remove all elements from list l that have a value equal to k.

Example

For l = [3, 1, 2, 3, 4, 5] and k = 3, the output should be
removeKFromList(l, k) = [1, 2, 4, 5];
For l = [1, 2, 3, 4, 5, 6, 7] and k = 10, the output should be
removeKFromList(l, k) = [1, 2, 3, 4, 5, 6, 7].
Input/Output

[time limit] 4000ms (py3)
[input] linkedlist.integer l

A singly linked list of integers.

Guaranteed constraints:
0 ≤ list size ≤ 10^5,
-1000 ≤ element value ≤ 1000.

[input] integer k

An integer.

Guaranteed constraints:
-1000 ≤ k ≤ 1000.

[output] linkedlist.integer

Return l with all the values equal to k removed.
~~~

So the description is straight forward and the answer should be simple as well -- this one is supposed to be easy. But there are details:

0. What is the backup solution -- a.k.a. the safe yet a bit slow one? (I would expect this one to be obvious, in fact for most linked list questions this step is obvious)
1. What if head itself is the value?
2. How do you properly delete a node?

So my solutions goes like this:

~~~python
# Definition for singly-linked list:
# class ListNode(object):
#   def __init__(self, x):
#     self.value = x
#     self.next = None
#
def removeKFromList(l, k):
    curr = l
    while curr is not None:
        if curr.value != k:
            break
        curr = curr.next
    # first move and set the head
    new_head = curr
    prev = None
    # move along
    while curr is not None:
        if curr.value == k:
            if prev is not None:
                prev.next = curr.next
            curr = curr.next
            continue
        prev = curr
        curr = curr.next
    return new_head
~~~

And I see a solution like this, which is easier to reason through and shorter (usually a shorter one is also the cleaner one)

~~~python
# Definition for singly-linked list:
# class ListNode(object):
#   def __init__(self, x):
#     self.value = x
#     self.next = None
#
def removeKFromList(l, k):
    fakeHead = ListNode(None)
    fakeHead.next = l
    current = fakeHead
    while current:
        while current.next and current.next.value == k:
            current.next = current.next.next
        current = current.next
    return fakeHead.next
~~~

What is good about this:

1. it is shorter.
2. the one it handles skip to the new node is good.
3. it unifies the head problem. Usually in linked list, head is a headache, and from this solution, I learned a new trick for handling this.

So this is an easy one and there will be more to come.
