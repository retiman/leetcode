import { deserialize } from '../../src/tree/common/tree-node';
import { diameterOfBinaryTree } from '../../src/tree/diameter-of-binary-tree';

describe('diameter of binary tree', () => {
  test('diameter of binary tree - test case 1', async () => {
    const tree = deserialize([1, 2, 3]);

    expect(diameterOfBinaryTree(tree)).toBe(2);
  });

  test('diameter of binary tree - test case 2', async () => {
    const tree = deserialize([1, 2, 3, 4, 5]);

    expect(diameterOfBinaryTree(tree)).toBe(3);
  });
});
