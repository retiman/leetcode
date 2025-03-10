import { array2tree } from '../../src/tree/common/tree-node';
import { rangeSumBST } from '../../src/tree/range-sum-of-bst';

describe('range sum of bst', () => {
  test('range sum of bst - test case 1', async () => {
    const tree = array2tree([10, 5, 15, 3, 7, null, 18]);
    expect(rangeSumBST(tree, 7, 15)).toBe(32);
  });
});
