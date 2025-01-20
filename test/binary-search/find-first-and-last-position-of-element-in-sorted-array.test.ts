import { searchRange } from '../../src/binary-search/find-first-and-last-position-of-element-in-sorted-array';

describe('find first and last position of element in sorted array', () => {
  test('searchRange - test case i', async () => {
    expect(searchRange([5, 7, 7, 8, 8, 10], 8)).toStrictEqual([3, 4]);
  });
});
