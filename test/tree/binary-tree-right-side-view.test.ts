import { array2tree } from '../../src/tree/common/tree-node';
import { rightSideView } from '../../src/tree/binary-tree-right-side-view';

describe('binary tree right side view', () => {
  test('binary tree right side view', async () => {
    const root = array2tree([1, 2, 3, null, 5, null, 4]);

    expect(rightSideView(root)).toStrictEqual([1, 3, 4]);
  });
});
