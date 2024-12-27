import { deserialize } from '../../src/tree/common/tree-node';
import { verticalOrder } from '../../src/tree/binary-tree-vertical-order-traversal';

describe('binary tree vertical order traversal', () => {
  test('binary tree vertical order traversal - test case 1', async () => {
    const tree = deserialize([3, 9, 20, null, null, 15, 7]);

    expect(verticalOrder(tree)).toStrictEqual([[9], [3, 15], [20], [7]]);
  });
});
