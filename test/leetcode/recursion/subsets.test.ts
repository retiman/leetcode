import { subsets } from '../../src/recursion/subsets';

describe('subsets', () => {
  test('subsets - test case 1', async () => {
    expect(subsets([])).toStrictEqual([[]]);
  });

  test('subsets - test case 2', async () => {
    expect(subsets([1, 2, 3])).toMatchSnapshot();
  });

  test('subsets - test case 3', async () => {
    expect(subsets([0])).toMatchSnapshot();
  });
});
