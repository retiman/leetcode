import { findBuildings } from '../../src/array/buildings-with-an-ocean-view';

describe('buildings with an ocean view', () => {
  test('findBuildings - test case 1', async () => {
    expect(findBuildings([4, 2, 3, 1])).toEqual([0, 2, 3]);
  });
});
