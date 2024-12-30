import { smallestDivisor } from '../../src/binary-search/find-the-smallest-divisor-given-a-threshold';

describe('find the smallest divisor given a threshold', () => {
  test('find the smallest divisor given a threshold', async () => {
    expect(smallestDivisor([1, 2, 5, 9], 6)).toBe(5);
  });
});
