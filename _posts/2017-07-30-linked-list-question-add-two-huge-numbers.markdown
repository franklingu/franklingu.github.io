---
layout: blog_base
title: Linked List Question -- add two huge numbers
category: programming
tag: algorithm
meta_desc: add two huge numbers represented by linked lists, the "addTwoHugeNumbers" question and analysis
---

We can use linked list to represent huge integers, and therefore addition could be performed and for this we can have a question:

~~~
You're given 2 huge integers represented by linked lists. Each linked list element is a number from 0 to 9999 that represents a number with exactly 4 digits. The represented number might have leading zeros. Your task is to add up these huge integers and return the result in the same format.

Example

For a = [9876, 5432, 1999] and b = [1, 8001], the output should be
addTwoHugeNumbers(a, b) = [9876, 5434, 0].

Explanation: 987654321999 + 18001 = 987654340000.

For a = [123, 4, 5] and b = [100, 100, 100], the output should be
addTwoHugeNumbers(a, b) = [223, 104, 105].

Explanation: 12300040005 + 10001000100 = 22301040105.

Input/Output

[time limit] 3000ms (java)
[input] linkedlist.integer a

The first number, without its leading zeros.

Guaranteed constraints:
0 ≤ a size ≤ 104,
0 ≤ element value ≤ 9999.

[input] linkedlist.integer b

The second number, without its leading zeros.

Guaranteed constraints:
0 ≤ b size ≤ 104,
0 ≤ element value ≤ 9999.

[output] linkedlist.integer

The result of adding a and b together, returned without leading zeros in the same format.
~~~

Analysis:

0. Carry is definitely important
1. Sign does not matter cause we are guaranteed with non-negative inputs
2. Singly linked list could be difficult to handle, but we can change this problem to be easier by reversing them first

~~~python
# Definition for singly-linked list:
# class ListNode(object):
#   def __init__(self, x):
#     self.value = x
#     self.next = None
#
def addTwoHugeNumbers(a, b):
    new_a = reverse_linked_list(a)
    new_b = reverse_linked_list(b)
    curr_a, curr_b = new_a, new_b
    carry = 0
    new_head = None
    prev = None
    while curr_a is not None or curr_b is not None:
        curr, carry = add_list_elem(curr_a, curr_b, carry)
        if prev:
            prev.next = curr
            prev = curr
        if new_head is None:
            new_head = curr
            prev = curr
        if curr_a:
            curr_a = curr_a.next
        if curr_b:
            curr_b = curr_b.next
    if carry:
        curr = ListNode(carry)
        prev.next = curr
    new_head = reverse_linked_list(new_head)
    # reverse the inputed lists back, try to avoid side effects
    reverse_linked_list(new_a)
    reverse_linked_list(new_b)
    return new_head


def reverse_linked_list(head):
    """reverse linked list, tail becomes head and new head is returned
    """
    if head is None:
        return None
    curr, prev = head, None
    while curr is not None:
        tmp = curr
        curr = curr.next
        tmp.next = prev
        prev = tmp
    return prev

def add_list_elem(in1, in2, carry):
    """addition of two nodes with carry_in and carry_out
    """
    in1_val = in1.value if in1 else 0
    in2_val = in2.value if in2 else 0
    tmp = in1_val + in2_val + carry
    return ListNode(tmp % 10000), tmp // 10000
~~~

This question seems easy as well. Just need to pay attention to details -- and I think in most cases that is exactly what is needed -- thinking a problem through is hard and once this step is done, implementation is straight forward compared to it, but thinking through is hard to get, if not impossible in real life.
