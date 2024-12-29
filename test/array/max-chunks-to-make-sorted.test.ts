import { maxChunksToSorted } from '../../src/array/max-chunks-to-make-sorted';

describe('max chunks to make sorted', () => {
  test('max chunks to make sorted - test case 1', async () => {
    expect(maxChunksToSorted([4, 3, 2, 1, 0])).toBe(1);
  });
});
