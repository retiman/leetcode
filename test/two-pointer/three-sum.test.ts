import { threeSum } from '../../src/two-pointer/three-sum';

describe('three sum', () => {
  test('three sum - test case 1', async () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4])).toMatchSnapshot();
  });

  test('three sum - test case 2', async () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4])).toMatchSnapshot();
  });
});
