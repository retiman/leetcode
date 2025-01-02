import { merge } from '../../src/interval/merge-intervals';

describe('merge intervals', () => {
  test('merge intervals - test case 1', async () => {
    expect(
      merge([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18]
      ])
    ).toStrictEqual([
      [1, 6],
      [8, 10],
      [15, 18]
    ]);
  });
});
