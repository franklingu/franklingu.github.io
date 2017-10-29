---
layout: blog_base
title: Linked List Question -- reverse nodes in k groups
category: programming
tag: algorithm
meta_desc: reverse nodes in k groups linked list question, the "reverseNodesInKGroups" question and analysis
---

Singly linked list is one-directional and therefore reversing it is tricky because once you move foward you cannot go back to previous node. So that means you need to remember the previous one and proper reverse the next link.

But reversing a single linked list from head to tail is only tricky to this extent. So if we go one step further, we will have the "reverseNodesInKGroups" problem.

~~~
Note: Your solution should have O(n) time complexity, where n is the number of element in l, and O(1) additional space complexity, since this is what you would be asked to accomplish in an interview.

Given a linked list l, reverse its nodes k at a time and return the modified list. k is a positive integer that is less than or equal to the length of l. If the number of nodes in the linked list is not a multiple of k, then the nodes that are left out at the end should remain as-is.

You may not alter the values in the nodes - only the nodes themselves can be changed.

Example

    For l = [1, 2, 3, 4, 5] and k = 2, the output should be
    reverseNodesInKGroups(l, k) = [2, 1, 4, 3, 5];
    For l = [1, 2, 3, 4, 5] and k = 1, the output should be
    reverseNodesInKGroups(l, k) = [1, 2, 3, 4, 5];
    For l = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] and k = 3, the output should be
    reverseNodesInKGroups(l, k) = [3, 2, 1, 6, 5, 4, 9, 8, 7, 10, 11].

Input/Output

    [time limit] 4000ms (py3)

    [input] linkedlist.integer l

    A singly linked list of integers.

    Guaranteed constraints:
    1 ≤ list size ≤ 104,
    -109 ≤ element value ≤ 109.

    [input] integer k

    The size of the groups of nodes that need to be reversed.

    Guaranteed constraints:
    1 ≤ k ≤ l size.

    [output] linkedlist.integer

    The initial list, with reversed groups of k elements.
~~~

Analysis:
0. So this question is still about reversing linked list -- so we can built on top of reverseLinkedList problem.
1. And then the problem is simplified to divide the list into groups of k elements
2. For each group, reverse it, properly insert this new linked list part to the new linked list.
3. So the end requires special handling: tail is reached or no more elements to form a k group.

~~~python
# Definition for singly-linked list:
# class ListNode(object):
#   def __init__(self, x):
#     self.value = x
#     self.next = None
#

def reverseNodesInKGroups(l, k):
    # handling special cases
    if k == 1 or l is None or l.next is None:
        return l
    end_reached = False
    new_head, prev_tail, next_head = None, None, l
    while not end_reached:
        # take out a group of k elements
        sub_head, sub_tail, end_reached = takeKNodes(next_head, k)
        # the following part is special to the assumption:
        # when fewer than k elements are left, do not reverse
        if end_reached:
            if prev_tail is not None:
                prev_tail.next = sub_head
            continue
        # remember next element and break the part of list to form a
        # separate list
        next_head = sub_tail.next
        sub_tail.next = None
        # reverse this k-elements group
        reverseLinkedList(sub_head)
        # remember the new head of the list
        if new_head is None:
            new_head = sub_tail
        # if previous tail node is set, which means there is one or more
        # prev parts done, join the newly reversed k-elements group
        # with previously processed ones
        if prev_tail is not None:
            prev_tail.next = sub_tail
        prev_tail = sub_head
    return new_head


def takeKNodes(head, k):
    """Return a linked list part of length k"""
    curr, prev, acc = head, None, 0
    while curr is not None and acc < k:
        prev, curr, acc = curr, curr.next, acc + 1
    return head, prev, (curr is None and acc < k)


def reverseLinkedList(head):
    """Reverse linked list
    """
    curr, prev = head, None
    while curr is not None:
        tmp = curr
        curr = curr.next
        tmp.next = prev
        prev = tmp
    return prev
~~~

For this problem, properly reduce it to some known existing problems will save us a lot of work -- for programming, solve the unknown with what we have known already is a very needed ability.

