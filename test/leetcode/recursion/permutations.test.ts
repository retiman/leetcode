import { permute } from '../../src/recursion/permutations';

describe('permute', () => {
  test('permute - test case 1', async () => {
    expect(permute([])).toStrictEqual([[]]);
  });

  test('permute - test case 2', async () => {
    expect(permute([1, 2, 3])).toMatchSnapshot();
  });

  test('permute - test case 3', async () => {
    expect(permute([0, 1])).toMatchSnapshot();
  });

  test('permute - test case 4', async () => {
    expect(permute([1])).toStrictEqual([[1]]);
  });
});
