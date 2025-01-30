// DIFFICULTY: MEDIUM
//
// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any
// order.
//
// See {@link https://leetcode.com/problems/top-k-frequent-elements/}
export { topKFrequent };

// SOLUTION:
//
// Just map each number to its frequency then sort by frequency.  Return the first k elements.
//
// COMPLEXITY:
//
// Time complexity dominated by the sort, which is O(n log n).  Space complexity is O(n) because we are using a map to
// to store frequency.
function topKFrequent(xs: number[], k: number) {
  type Frequency = number;
  const map = new Map<number, Frequency>();

  // Map each number to its frequency.
  for (let i = 0; i < xs.length; i++) {
    const x = xs[i];
    const frequency = map.get(x) ?? 0;
    map.set(x, frequency + 1);
  }

  // Now get all unique elements from the list.
  const uniques = [...map.keys()];

  // Sort the unique values by their frequency.  Since we want the most frequent elements, we sort in decreasing order.
  uniques.sort((a, b) => map.get(b)! - map.get(a)!);

  // Return the first k elements.
  return uniques.slice(0, k);
}
