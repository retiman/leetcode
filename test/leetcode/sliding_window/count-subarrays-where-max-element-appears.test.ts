import fs from 'fs';
import path from 'path';
import { countSubarrays } from '../../src/sliding-window/count-subarrays-where-max-element-appears';

describe('count subarrays where max element appears at least k times', () => {
  test('count subarrays - test case 1', async () => {
    expect(countSubarrays([1, 3, 2, 3, 3], 2)).toBe(6);
  });

  test.skip('count subarrays - test case 2', async () => {
    expect(countSubarrays([1, 4, 2, 1], 3)).toBe(0);
  });

  test.skip('count subarrays - test case 3', async () => {
    expect(
      countSubarrays(
        [61, 23, 38, 23, 56, 40, 82, 56, 82, 82, 82, 70, 8, 69, 8, 7, 19, 14, 58, 42, 82, 10, 82, 78, 15, 82],
        2
      )
    ).toBe(224);
  });

  test.skip('count subarrays - test case 4', async () => {
    const data = fs
      .readFileSync(path.join(__dirname, '__data__', 'count-subarrays-where-max-element-appears.test.json'))
      .toString();
    const nums = JSON.parse(data);

    expect(countSubarrays(nums, 13)).toBe(263559);
  });
});
