import { NestedInteger } from '../../src/linked-list/common/nested-integer';
import { depthSum } from '../../src/graph/nested-list-weighted-sum';

describe('nested list weighted sum', () => {
  test('nested list weighted sum - test case 1', async () => {
    expect(depthSum([new NestedInteger(10)])).toBe(10);
  });

  test('nested list weighted sum - test case 2', async () => {
    expect(depthSum([new NestedInteger(10), new NestedInteger(20)])).toBe(30);
  });
});
