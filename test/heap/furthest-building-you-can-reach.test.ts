import { furthestBuilding } from '../../src/heap/furthest-building-you-can-reach';

describe('furthest building you can reach', () => {
  test('furthest building - test case 1', async () => {
    const heights = [4, 2, 7, 6, 9, 14, 12];
    expect(furthestBuilding(heights, 5, 1)).toBe(4);
  });

  test('furthest building - test case 2', async () => {
    const heights = [4, 12, 2, 7, 3, 18, 20, 3, 19];
    expect(furthestBuilding(heights, 10, 2)).toBe(7);
  });

  test('furthest building - test case 3', async () => {
    const heights = [14, 3, 19, 3];
    expect(furthestBuilding(heights, 17, 0)).toBe(3);
  });
});
