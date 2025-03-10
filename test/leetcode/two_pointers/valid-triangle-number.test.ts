import { triangleNumber } from '../../src/two-pointer/valid-triangle-number';

describe('valid triangle number', () => {
  test('valid triangle number - test case 1', async () => {
    expect(triangleNumber([2, 2, 3, 4])).toBe(3);
  });
});
