# Binary Search

There are multiple ways of doing binary search.  Two major ways are used in this repository.

## Standard Algorithm

Use this to check if an element exists in the array.  The `left` and `right` pointers are always within bounds.  Exiting the while loop indicates the element was not found.

```
let left = 0, right = xs.length - 1;
while (left <= right) {
  const m = Math.floor((left + right) / 2);
  if (xs[m] < target) {
    left = m + 1;
  } else if (xs[m] > target) {
    right = m - 1;
  } else {
    return m;
  }
}
return -1;
```

### Left-most Duplicate

Use this to check where an element can be inserted into the array.  The `left` and `right` pointers are not always within bounds (because the element could be inserted at the end of the array).  Exiting the while loop indicates the element was found or you've found a good place to insert.

```
let left = 0, right = xs.length;
while (left < right) {
  const m = Math.floor((left + right) / 2);
  if (xs[m] < target) {
    left = m + 1;
  } else {
    right = m;
  }
}
return left < xs.length && xs[left] === target ? left : -1;
```

## Common Phrases

These phrases indicate binary search might be useful:

- sorted array
- find the position or index

## Boundaries

See the two pointer technique for a discussion of how to set boundary conditions.
