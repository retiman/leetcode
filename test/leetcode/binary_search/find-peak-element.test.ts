import { findPeakElement } from '../../src/binary-search/find-peak-element';

describe('find peak element', () => {
  test('find peak element - test case 1', async () => {
    expect(findPeakElement([1, 2, 3, 1])).toBe(2);
  });

  test('find peak element - test case 2', async () => {
    expect(findPeakElement([1, 2, 1, 3, 5, 6, 4])).toBe(5);
  });

  test('find peak element - test case 3', async () => {
    expect(findPeakElement([1])).toBe(0);
  });

  test('find peak element - test case 4', async () => {
    expect(findPeakElement([2, 1])).toBe(0);
  });

  test('find peak element - test case 5', async () => {
    expect(findPeakElement([-2147483647, -2147483648])).toBe(0);
  });

  test('find peak element - test case 6', async () => {
    expect(findPeakElement([1, 2])).toBe(1);
  });
});
