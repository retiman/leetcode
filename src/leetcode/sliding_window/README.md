# Sliding Window

## Common Phrases

These phrases indicate the sliding window technique might be useful:

- fixed-size subarray with a condition
- longest subarray with a condition
- at most k, at least k, no more than k
- max sum over a range, min sum over a range
- continuous subarray
- substring
- dynamic constraints

## Notable Problems

### Sliding Window Maximum

The [sliding window maximum](https://leetcode.com/problems/sliding-window-maximum/) (hard) problem can be solved with a deque; the sliding window itself is implicitly maintained by the deque.

The above resembles the [maximum subarray](https://leetcode.com/problems/maximum-subarray/) (medium) problem, which can be solved optimally using [Kadanes Algorithm](https://en.wikipedia.org/wiki/Maximum_subarray_problem), or with prefix sum for a more direct and explicit solution.

### Longest Substring with at Most K Distinct Characters

The [longest substring with at most k distinct characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/) (medium) problem can be solved with the sliding window technique plus a hashmap.

The above resembles the [longest substring without repeating characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/) (medium), which can be solved using the two pointer technique plus a hashmap.
