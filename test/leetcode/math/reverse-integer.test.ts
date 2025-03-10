import { reverse } from '../../src/math/reverse-integer';

describe('reverse integer', () => {
  test('reverse integer - test case 1', async () => {
    expect(reverse(123)).toBe(321);
  });
});
