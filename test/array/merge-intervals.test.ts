// DIFFICULTY: Medium
//
// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array
// of the non-overlapping intervals that cover all the intervals in the input.
//
// See https://leetcode.com/problems/merge-intervals/
describe('merge intervals', () => {
  function merge(intervals: number[][]): number[][] {
    function compareInternal(a: number[], b: number[]) {
      if (a[0] < b[0]) {
        return -1;
      }

      if (a[0] > b[0]) {
        return 1;
      }

      // If a[0] and b[0] are the same value, we can just compare based on a[1] and b[1], and a normal comparator will
      // give elements in ascending order via x - y.
      return a[1] - b[1];
    }

    function shouldMerge(a: number[], b: number[]) {
      // If the intervals are disjoint, then a[1] is going to be strictly less than b[0].  In every other case, we
      // should merge.
      if (a[1] < b[0]) {
        return false;
      }

      return true;
    }

    function mergeInternal(a: number[], b: number[]) {
      // Because the intervals are sorted, a[0] is always going to be smaller or the same as b[0].
      return [a[0], Math.max(a[1], b[1])];
    }

    // First sort the interval, then run our merge algorithm.
    intervals.sort((a, b) => compareInternal(a, b));

    const merged: number[][] = [];
    for (const interval of intervals) {
      if (merged.length === 0) {
        merged.push(interval);
        continue;
      }

      const a = merged[merged.length - 1];
      const b = interval;
      if (!shouldMerge(a, b)) {
        merged.push(b);
        continue;
      }

      merged[merged.length - 1] = mergeInternal(a, b);
    }

    return merged;
  }

  test('test case 1', async () => {
    expect(
      merge([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18]
      ])
    ).toStrictEqual([
      [1, 6],
      [8, 10],
      [15, 18]
    ]);
  });
});
