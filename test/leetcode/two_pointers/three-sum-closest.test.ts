import { threeSumClosest } from '../../src/two-pointer/three-sum-closest';

describe('three sum closest', () => {
  test('three sum closest - test case 1', async () => {
    expect(threeSumClosest([-1, 2, 1, -4], 1)).toStrictEqual(2);
  });

  test('three sum closest - test case 2', async () => {
    expect(threeSumClosest([0, 0, 0], 1)).toStrictEqual(0);
  });
});
