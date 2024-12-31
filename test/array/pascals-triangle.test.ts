import { generate } from '../../src/array/pascals-triangle';

describe('pascals triangle', () => {
  test('pascals triangle - test case 1', async () => {
    expect(generate(5)).toStrictEqual([[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]);
  });
});
