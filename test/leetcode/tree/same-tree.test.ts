import { TreeNode } from '../../src/tree/common/tree-node';
import { isSameTree } from '../../src/tree/same-tree';

describe('same tree', () => {
  test('same tree - test case 1', async () => {
    expect(isSameTree(null, null)).toBe(true);
  });

  test('same tree - test case 2', async () => {
    expect(isSameTree(new TreeNode(10, null, null), new TreeNode(10, null, null)));
  });
});
