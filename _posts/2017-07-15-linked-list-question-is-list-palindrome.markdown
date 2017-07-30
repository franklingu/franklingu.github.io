---
layout: blog_base
title: Linked List Question -- is list palindrome
category: programming
tag: algorithm
meta_desc: is list palindrome, the "isListPalindrome" question and analysis
---

> A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward as forward, such as madam or racecar.

Palindromic strings, palindromic numbers and now palindromic linked list (we cannot have palindromic trees but we can have symmetric trees). Palindrome is a frequent notion in interview question set.

Question description:

~~~
Given a singly linked list of integers, determine whether or not it's a palindrome.

Example

For l = [0, 1, 0], the output should be
isListPalindrome(l) = true;
For l = [1, 2, 2, 3], the output should be
isListPalindrome(l) = false.
Input/Output

[time limit] 4000ms (py3)
[input] linkedlist.integer l

A singly linked list of integers.

Guaranteed constraints:
0 ≤ list size ≤ 5 · 10^5,
-10^9 ≤ element value ≤ 10^9.

[output] boolean

Return true if l is a palindrome, otherwise return false.
~~~

Analysis:

0. When we translate the given linked list to array, it is easy enough right. And the backup solution is clear.
1. So the problem with linked list is that I cannot go backwards easily -- what if I reverse the linked list then? When I break the list into two halves, reverse the first half, and traverse both at the same pace.
2. For this solution, we need to restore the original data back; plus pay attention to even and odd length lists.

~~~python
# Definition for singly-linked list:
# class ListNode(object):
#   def __init__(self, x):
#     self.value = x
#     self.next = None
#
def isListPalindrome(l):
    if l is None:
        return True
    ll = len_linked_list(l)
    if ll == 1:
        return True
    print(ll)
    breakup, curr = None, l
    breakupIdx = (ll + 1) // 2 - 1
    idx = 0
    while idx < breakupIdx:
        curr = curr.next
        idx += 1
    breakup = curr
    target = breakup.next
    breakup.next = None
    newHead = reverse_linked_list(target)
    curr, newCurr = l, newHead
    palindrome = True
    while curr is not None and newCurr is not None:
        if curr.value != newCurr.value:
            palindrome = False
            break
        curr = curr.next
        newCurr = newCurr.next
    if curr is not None and ll % 2 == 0:
        palindrome = False
    reverse_linked_list(newHead)
    breakup.next = target
    return palindrome


def reverse_linked_list(l):
    if l is None:
        return l
    curr, prev = l, None
    while curr is not None:
        tmp = curr
        curr = curr.next
        tmp.next = prev
        prev = tmp
    return prev

def len_linked_list(l):
    if l is None:
        return 0
    ll = 0
    curr = l
    while curr is not None:
        curr = curr.next
        ll += 1
    return ll
~~~

Add on:

How to find the middle? My solution makes use length, which is okay. But a better solution:

~~~python
def find_middle(head):
    runner, fast = head, head
    while fast is not None:
        fast = fast.next
        if fast is not None:
            fast = fast.next
        else:
            break
        runner = runner.next
    return runner

# [1, 2, 3, 4]  -- > 2
# [1, 2, 3, 4, 5] -- > 3
~~~

Why mention this?

1. This is handy to use and there is no need to deal with length and even or odd
2. This will be used later in check if a circle is there.
