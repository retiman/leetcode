import { array2list, list2array } from '../../src/linked-list/common/list-node';
import { mergeKLists } from '../../src/linked-list/merge-k-sorted-lists';

describe('merge k sorted lists', () => {
  test('merge k sorted lists - test case 1', async () => {
    const lists = [null, null].map(array2list);
    const merged = mergeKLists(lists);

    expect(merged).toBeNull();
  });

  test('merge k sorted lists - test case 2', async () => {
    const lists = [[1], null].map(array2list);
    const merged = mergeKLists(lists);

    expect(list2array(merged)).toStrictEqual([1]);
  });

  test('merge k sorted lists - test case 3', async () => {
    const lists = [null, [1]].map(array2list);
    const merged = mergeKLists(lists);

    expect(list2array(merged)).toStrictEqual([1]);
  });

  test('merge k sorted lists - test case 4', async () => {
    const lists = [[1], [2]].map(array2list);
    const merged = mergeKLists(lists);

    expect(list2array(merged)).toStrictEqual([1, 2]);
  });

  test('merge k sorted lists - test case 5', async () => {
    const lists = [
      [1, 2, 4],
      [1, 3, 4]
    ].map(array2list);
    const merged = mergeKLists(lists);

    expect(list2array(merged)).toStrictEqual([1, 1, 2, 3, 4, 4]);
  });

  test('merge k sorted lists - test case 6', async () => {
    const lists = [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ].map(array2list);
    const merged = mergeKLists(lists);

    expect(list2array(merged)).toStrictEqual([1, 1, 2, 3, 4, 4, 5, 6]);
  });
});
