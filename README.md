# LeetCode

Problems and solutions for LeetCode.


## Priority Queue

Several problems require access to a priority queue; however, TypeScript itself does not have such a built-in data structure.


### LeetCode

LeetCode provides support for [heaps](https://support.leetcode.com/hc/en-us/articles/360011833974-What-are-the-environments-for-the-programming-languages) via [datastructures-js/priority-queue](https://github.com/datastructures-js/priority-queue) at version `5.4.0`.  This is the library used, because this repository is for LeetCode submissions.

Note that LeetCode uses `require` style imports and not `import`.  Practically that means `MaxPriorityQueue` does accept parameterized types.


### CoderPad

CoderPad has no official support for priority queues.


### CodeSignal

CodeSignal's official documentation does not claim support for priority queues.  However, there is [documentation](https://learn.codesignal.com/preview/lessons/3525/heaps-and-priority-queues-in-javascript?utm_source=chatgpt.com) suggesting that [heap-js](https://github.com/ignlg/heap-js) is available.


### Other

There are a few other options.

- Insert into an array and sort it afterwards.  See [simple-heap.ts](src/heap/simple-heap.ts).
- Use binary search to insert into an array and do not sort.  See [bs-search-heap.ts](src/heap/bs-search-heap.ts).
- Roll your own heap during the interview.  You beast.
- Give up.
