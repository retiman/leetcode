import { trap } from '../../src/two-pointer/trapping-rain-water';

describe('trapping rain water', () => {
  test('trapping rain water - test case 1', async () => {
    expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
  });

  test('trapping rain water - test case 2', async () => {
    expect(trap([0, 1, 1, 0])).toBe(0);
  });

  test('trapping rain water - test case 3', async () => {
    expect(trap([0, 1, 0, 1, 0])).toBe(1);
  });
});
