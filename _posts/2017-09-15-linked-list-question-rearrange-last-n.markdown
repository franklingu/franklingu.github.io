---
layout: blog_base
title: Linked List Question -- rearrange last n
category: programming
tag: algorithm
meta_desc: rearrange last n linked list question, the "rearrangeLastN" question and analysis
---

Manipulating a singly linked list is about paying attention to details -- and that is what is needed for most, if not all, programming tasks.

~~~
Note: Try to solve this task in O(list size) time using O(1) additional space, since this is what you'll be asked during an interview.

Given a singly linked list of integers l and a non-negative integer n, move the last n list nodes to the beginning of the linked list.

Example

    For l = [1, 2, 3, 4, 5] and n = 3, the output should be
    rearrangeLastN(l, n) = [3, 4, 5, 1, 2];
    For l = [1, 2, 3, 4, 5, 6, 7] and n = 1, the output should be
    rearrangeLastN(l, n) = [7, 1, 2, 3, 4, 5, 6].

Input/Output

    [time limit] 4000ms (py3)

    [input] linkedlist.integer l

    A singly linked list of integers.

    Guaranteed constraints:
    0 ≤ list size ≤ 105,
    -1000 ≤ element value ≤ 1000.

    [input] integer n

    A non-negative integer.

    Guaranteed constraints:
    0 ≤ n ≤ list size.

    [output] linkedlist.integer

    Return l with the n last elements moved to the beginning.
~~~

Analysis:
1. We just need to bring a tail part to the front of the linked list
2. With input constraint on n, things are simpler and there is not error handling there when n is too big

~~~python
# Definition for singly-linked list:
# class ListNode(object):
#   def __init__(self, x):
#     self.value = x
#     self.next = None
#
def rearrangeLastN(l, n):
    if l is None or n <= 0:
        return l
    llen, curr, tail = 0, l, None
    while curr is not None:
        tail = curr
        curr, llen = curr.next, llen + 1
    if n >= llen:
        return l
    acc, mark, curr = 0, llen - n - 1, l
    while acc < mark:
        curr, acc = curr.next, acc + 1
    tail.next  = l
    new_head = curr.next
    curr.next = None
    return new_head
~~~

Is this solution the most efficient--well it is not--cause we can omit the finding length of the list part since we are guaranteed with a reasonable n. In this case, we can first advance curr to n + 1, and then move curr and new_tail together at the same pace, when curr is at null, new_tail will be pointing to be new head and after a few manipulation we are done.

So what is the advantage of finding length first? This way we can raise error if n is bigger than length of the list (this is for general case and apparently not useful here).

