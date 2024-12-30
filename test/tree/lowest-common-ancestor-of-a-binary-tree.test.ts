import { array2tree } from '../../src/tree/common/tree-node';
import { lowestCommonAncestor } from '../../src/tree/lowest-common-ancestor-of-a-binary-tree';

describe('lowest common ancestor of a binary tree i', () => {
  test('lowest common ancestor - test case 1', async () => {
    const tree = array2tree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);

    expect(lowestCommonAncestor(tree, tree!.left, tree!.right)?.val).toStrictEqual(3);
  });
});
