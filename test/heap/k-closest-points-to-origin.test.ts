import { kClosest } from '../../src/heap/k-closest-points-to-origin';

describe('k closest points to origin', () => {
  test('k closest - test case 1', () => {
    expect(
      kClosest(
        [
          [1, 3],
          [-2, 2]
        ],
        1
      )
    ).toStrictEqual([[-2, 2]]);
  });
});
