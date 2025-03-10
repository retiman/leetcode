import { removeDuplicates } from '../../src/two-pointer/remove-duplicates-from-sorted-array';

describe('remove duplicates from sorted array', () => {
  test('remove duplicates from sorted array - test case 1', () => {
    expect(removeDuplicates([1, 1, 2])).toBe(2);
  });
});
