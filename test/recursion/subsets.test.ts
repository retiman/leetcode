// DIFFICULTY: Medium
//
// Given an integer array nums of unique elements, return all possible subsets  (the power set).
//
// The solution set must not contain duplicate subsets. Return the solution in any order.
//
// See https://leetcode.com/problems/subsets/
describe('subsets', () => {
  function subsets(nums: number[]) {
    function run(xs: Set<number>): Set<Set<number>> {
      if (xs.size === 0) {
        // Note that new Set(new Set()) gives you a set with zero elements, because the constructor takes all elements of
        // the first argument and adds them to the set.  So you actually want to construct a new iterable based on the
        // empty set.
        return new Set([new Set()]);
      }

      // Find the first element of xs and call it x; remove it from the list.
      const x = xs.values().next().value;

      // Generate all subsets without x.
      const rest = new Set(xs);
      rest.delete(x);

      const excluded: Set<Set<number>> = run(rest);

      // Add x to all of the subsets from above.
      const included = new Set<Set<number>>();
      excluded.forEach(ex => {
        const set = new Set(ex);
        set.add(x);

        included.add(set);
      });

      // The subsets with x and the subsets without x constitute the power set.
      return new Set([...excluded, ...included]);
    }

    // LeetCode expects the result to be an array of arrays.
    const result = run(new Set(nums));
    return [...result].map(xs => [...xs]);
  }

  test('test case null', async () => {
    expect(subsets([])).toStrictEqual([[]]);
  });

  test('test case 1', async () => {
    expect(subsets([1, 2, 3])).toMatchSnapshot();
  });

  test('test case 2', async () => {
    expect(subsets([0])).toMatchSnapshot();
  });
});
