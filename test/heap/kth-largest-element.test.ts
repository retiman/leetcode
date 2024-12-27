import fs from 'fs';
import path from 'path';
import { findKthLargest, findKthLargestBinarySearch, findKthLargestSimple } from '../../src/heap/kth-largest-element';

describe('kth largest element in an array', () => {
  test('find kth largest - test case 1', async () => {
    expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toBe(5);
    expect(findKthLargestSimple([3, 2, 1, 5, 6, 4], 2)).toBe(5);
    expect(findKthLargestBinarySearch([3, 2, 1, 5, 6, 4], 2)).toBe(5);
  });

  test('find kth largest - test case 2', async () => {
    expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
    expect(findKthLargestSimple([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
    expect(findKthLargestBinarySearch([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
  });

  test.skip('find kth largest - test case 3', async () => {
    const data = fs.readFileSync(path.join(__dirname, '__data__', 'kth-largest-element.test.json')).toString();
    const array = JSON.parse(data);

    expect(findKthLargest(array, 50000)).toBe(1);
    expect(findKthLargestSimple(array, 50000)).toBe(1);
    expect(findKthLargestBinarySearch(array, 50000)).toBe(1);
  });
});
