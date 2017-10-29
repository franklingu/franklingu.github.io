---
layout: blog_base
title: Linked List Question -- merge two linked lists
category: programming
tag: algorithm
meta_desc: merge two linked lists, the "mergeTwoLinkedLists" question and analysis
---

Merge sort is a very good sorting algorithm and on top of it, other algorithms like external sort can be built as well. Merging two arrays is not hard but merging two linked lists may be a bit tricky to get right:

~~~
Note: Your solution should have O(l1.length + l2.length) time complexity, since this is what you will be asked to accomplish in an interview.

Given two singly linked lists sorted in non-decreasing order, your task is to merge them. In other words, return a singly linked list, also sorted in non-decreasing order, that contains the elements from both original lists.

Example

    For l1 = [1, 2, 3] and l2 = [4, 5, 6], the output should be
    mergeTwoLinkedLists(l1, l2) = [1, 2, 3, 4, 5, 6];
    For l1 = [1, 1, 2, 4] and l2 = [0, 3, 5], the output should be
    mergeTwoLinkedLists(l1, l2) = [0, 1, 1, 2, 3, 4, 5].

Input/Output

    [time limit] 4000ms (py3)

    [input] linkedlist.integer l1

    A singly linked list of integers.

    Guaranteed constraints:
    0 ≤ list size ≤ 104,
    -109 ≤ element value ≤ 109.

    [input] linkedlist.integer l2

    A singly linked list of integers.

    Guaranteed constraints:
    0 ≤ list size ≤ 104,
    -109 ≤ element value ≤ 109.

    [output] linkedlist.integer

    A list that contains elements from both l1 and l2, sorted in non-decreasing order.
~~~

Analysis:

1. The idea is similar to merging arrays
2. But the new head of the returned list needs to be take care of first
3. Keep two trackers, each tracker for a list, compare and pick the smaller one, advance the smaller one's tracker
4. When one list is exhausted, append the other list and we are done

~~~python
# Definition for singly-linked list:
# class ListNode(object):
#   def __init__(self, x):
#     self.value = x
#     self.next = None
#
def mergeTwoLinkedLists(l1, l2):
    curr1, curr2 = l1, l2
    new_head, prev = None, None
    while curr1 is not None or curr2 is not None:
        if curr1 is None:
            if prev:
                prev.next = curr2
            if new_head is None:
                new_head = curr2
            prev = curr2
            curr2 = curr2.next
            # end of list1 is reached, join the remaining of list2
            # and we are done
            break
        elif curr2 is None:
            if prev:
                prev.next= curr1
            if new_head is None:
                new_head = curr1
            prev = curr1
            curr1 = curr1.next
            # similar to above
            break
        else:
            if curr1.value <= curr2.value:
                if prev:
                    prev.next = curr1
                if new_head is None:
                    new_head = curr1
                prev = curr1
                curr1 = curr1.next
            else:
                if prev:
                    prev.next = curr2
                if new_head is None:
                    new_head = curr2
                prev = curr2
                curr2 = curr2.next
    return new_head
~~~

Special attention is needed when dealing with advancing, new head returning and joining the whole thing together without leaving any nodes out.

