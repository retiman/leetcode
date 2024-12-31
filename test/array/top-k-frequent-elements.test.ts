import { topKFrequent } from '../../src/array/top-k-frequent-elements';

describe('top k frequent elements', () => {
  test('top k frequent - test case 1', async () => {
    expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toStrictEqual([1, 2]);
  });
});
