import { intervalIntersection } from '../../src/interval/interval-list-intersections';

describe('interval list intersection', () => {
  test('interval list intersection - test case 1', async () => {
    const firstList = [
      [0, 2],
      [5, 10],
      [13, 23],
      [24, 25]
    ];
    const secondList = [
      [1, 5],
      [8, 12],
      [15, 24],
      [25, 26]
    ];

    expect(intervalIntersection(firstList, secondList)).toStrictEqual([
      [1, 2],
      [5, 5],
      [8, 10],
      [15, 23],
      [24, 24],
      [25, 25]
    ]);
  });
});
