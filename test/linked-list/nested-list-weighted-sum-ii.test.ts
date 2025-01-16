import { NestedInteger } from '../../src/linked-list/common/nested-integer';
import { depthSumInverse } from '../../src/linked-list/nested-list-weighted-sum-ii';

describe('nested list weighted sum ii', () => {
  test('nested list weighted sum ii - test case 1', async () => {
    expect(depthSumInverse([new NestedInteger(10)])).toBe(10);
  });

  test('nested list weighted sum ii - test case 2', async () => {
    expect(depthSumInverse([new NestedInteger(10), new NestedInteger(20)])).toBe(30);
  });
});
