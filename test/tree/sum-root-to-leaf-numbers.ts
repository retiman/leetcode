import { TreeNode } from '../../src/tree/common/tree-node';
import { sumNumbers } from '../../src/tree/sum-root-to-leaf-numbers';

describe('sum root to leaf numbers', () => {
  test('sum root to leaf numbers - test case 1', async () => {
    const tree = new TreeNode(1);
    tree.left = new TreeNode(2);
    tree.right = new TreeNode(3);

    expect(sumNumbers(tree)).toBe(25);
  });
});
