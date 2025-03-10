import { maxArea } from '../../src/two-pointer/container-with-most-water';

describe('container with most water', () => {
  test('container with most water - test case 1', async () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  });
});
