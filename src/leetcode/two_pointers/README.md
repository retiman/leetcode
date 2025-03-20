# Two Pointer

## Common Phrases

These phrases indicate the two pointer technique might be useful:

- non-fixed size subarray with condition
- sorted array, sorted list
- find pairs, find triplets
- maximize delta, minimize delta

## Boundaries

A note on boundary conditions when you have two pointers that move towards each other.

Use the `left < right` condition if its not necessary to process every element.  For example:

- palindromes checking, because the middle element is guaranteed to match itself.
- container with most water, because the when `left == right`, you have a container that does not hold water.

Use the `left <= right` condition when it is necessary to process every element.  For example:

- bag of tokens, because you must consider the ramifications of processing the token at `left == right`.
