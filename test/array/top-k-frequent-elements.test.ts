// DIFFICULTY: Medium
//
// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any
// order.
//
// See https://leetcode.com/problems/top-k-frequent-elements/
describe('top k frequent elements', () => {
  function topKFrequent(xs: number[], k: number) {
    type Frequency = number;
    const map = new Map<number, Frequency>();

    // Map each number to its frequency.
    for (let i = 0; i < xs.length; i++) {
      const x = xs[i];
      const frequency = map.get(x) ?? 0;
      map.set(x, frequency + 1);
    }

    // Sort the map keys by their frequency.
    //
    // Note that map.get(a)! - map.get(b)! would sort by increasing frequency; we want the most frequent elements first
    // instead.
    const keys = Array.from(map.keys());
    const sorted = keys.sort((a, b) => map.get(b)! - map.get(a)!);

    // Return the first k elements.
    return sorted.slice(0, k);
  }

  test('top k frequent - test case 1', async () => {
    expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toStrictEqual([1, 2]);
  });
});
