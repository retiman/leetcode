import { levelOrder } from '../../src/tree/binary-tree-level-order-traversal';
import { array2tree } from '../../src/tree/common/tree-node';

describe('binary tree level order traversal', () => {
  test('level order - test case 1', async () => {
    const tree = array2tree([3, 9, 20, null, null, 15, 7]);

    expect(levelOrder(tree)).toStrictEqual([[3], [9, 20], [15, 7]]);
  });

  test('level order - test case 2', async () => {
    const tree = array2tree([1]);

    expect(levelOrder(tree)).toStrictEqual([[1]]);
  });

  test('level order - test case 3', async () => {
    const tree = array2tree([]);

    expect(levelOrder(tree)).toStrictEqual([]);
  });
});
