import { search } from '../../src/binary-search/search-in-rotated-sorted-array';

describe('search in rotated sorted array', () => {
  test('search in rotated sorted array - test case 1', async () => {
    expect(search([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
  });

  test('search in rotated sorted array - test case 2', async () => {
    expect(search([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1);
  });

  test('search in rotated sorted array - test case 3', async () => {
    expect(search([1], 0)).toBe(-1);
  });

  test('search in rotated sorted array - test case 4', async () => {
    expect(search([3, 1], 1)).toBe(1);
  });
});
