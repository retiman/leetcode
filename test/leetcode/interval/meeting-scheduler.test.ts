import { minAvailableDuration } from '../../src/interval/meeting-scheduler';

describe('meeting scheduler', () => {
  test('meeting scheduler - test case 1', async () => {
    expect(
      minAvailableDuration(
        [
          [10, 50],
          [60, 120],
          [140, 210]
        ],
        [
          [0, 15],
          [60, 70]
        ],
        8
      )
    ).toStrictEqual([60, 68]);
  });
});
