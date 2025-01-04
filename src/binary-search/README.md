# Binary Search

There are multiple ways of doing binary search.  For consistency's sake, most solutions implement the left-most duplicate approach.

## Standard Algorithm

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

## Alternative Algorithm

```
let left = 0, right = xs.length - 1;
while (left !== right) {
  const m = Math.ceil((left + right) / 2);
  if (xs[m] > target) {
    right = m - 1;
  } else {
    left = m;
  }
}

if (xs[left] === target) {
  return left;
} else {
  return -1;
}
```

### Left-most Duplicate

The above algorithms will return any index equal to the target.  If there are duplicates and we desire the left-most duplicate, we can tweak the algorithm.

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
return left;
```

### Right-most Duplicate

The above algorithms will return any index equal to the target.  If there are duplicates and we desire the right-most duplicate, we can tweak the algorithm.

```
let left = 0, right = xs.length;
while (left < right) {
  const m = Math.floor((left + right) / 2);
  if (xs[m] > target) {
    right = m;
  } else {
    left = m + 1;
  }
}
return right -1;
```

## Common Phrases

These phrases indicate binary search might be useful:

- sorted array
- find the position or index

## Boundaries

See the two pointer technique for a discussion of how to set boundary conditions.
