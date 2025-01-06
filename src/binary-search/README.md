# Binary Search

There are multiple ways of doing binary search.  Two major ways are used in this repository.

## Standard Algorithm

Looks for a specific element.  Left and right indexes are always within bounds.  Exiting the loop means the element was not found.

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

Looks for an insertion point or exact match, handles duplicates giving you the left-most dulicate.

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
