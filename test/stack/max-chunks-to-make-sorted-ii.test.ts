import { maxChunksToSorted } from '../../src/stack/max-chunks-to-make-sorted-ii';

describe('max chunks to make sorted ii', () => {
  test('max chunks to make sorted ii - test case 1', async () => {
    expect(maxChunksToSorted([5, 4, 3, 2, 1])).toBe(1);
  });
});
