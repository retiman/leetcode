# Binary Search

There are multiple ways of doing binary search.  Hint:

- Use the standard algorithm to find an exact match; you throw away the `left` pointer at the end.
- Use the left-most duplicate algorithm to find an insertion point; you make use of the `left` pointer (which could be out of bounds at the end of the array) at the end.

## Standard Algorithm

Use this to check if an element exists in the array.  The `left` and `right` pointers are always within bounds.  Exiting the loop means the element was not found.

Note that this can be used like left most duplicate to find a good insertion point as well.

```
left = 0
right = len(xs) - 1

while left <= right:
    m = (left + right) // 2
    if xs[m] < target:
        left = m + 1
    elif xs[m] > target:
        right = m - 1
    else:
        return m

return -1
```

### Left-most Duplicate

Use this to check where an element can be inserted into the array.  The `left` and `right` pointers are not always within bounds (because the element could be inserted at the end of the array).  Exiting the while loop indicates the element was found or you've found a good place to insert.

```
left = 0
right = len(xs)

while left < right:
    m = (left + right) // 2
    if xs[m] < target:
        left = m + 1
    else:
        right = m

return left < len(xs) && xs[left] === target and left or -1
```

## Common Phrases

These phrases indicate binary search might be useful:

- sorted array
- find the position or index

## Boundaries

See the two pointer technique for a discussion of how to set boundary conditions.

## Notable Problems

### Longest Increasing Subsequence

The [longest increasing subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) (medium) problem can be solved naively with dynamic programming, or optimally with binary search.

The above resembles the [longest continuous increasing subsequence](https://leetcode.com/problems/longest-continuous-increasing-subsequence/) (easy) problem, which can be solved in a straightforward way via array iteration.

The above also resembles the [longest consecutive sequence](https://leetcode.com/problems/longest-consecutive-sequence/) (medium) problem, which can be solved with a set.
