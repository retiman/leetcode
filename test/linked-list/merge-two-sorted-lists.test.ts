import { array2list, list2array } from '../../src/linked-list/common/list-node';
import { mergeTwoLists } from '../../src/linked-list/merge-two-sorted-lists';

describe('merge two sorted lists', () => {
  test('merge two sorted lists - test case 1', async () => {
    const a = null;
    const b = null;
    const c = mergeTwoLists(a, b);

    expect(c).toBeNull();
  });

  test('merge two sorted lists - test case 2', async () => {
    const a = array2list([1]);
    const b = null;
    const c = mergeTwoLists(a, b);

    expect(list2array(c)).toStrictEqual([1]);
  });

  test('merge two sorted lists - test case 3', async () => {
    const a = null;
    const b = array2list([1]);
    const c = mergeTwoLists(a, b);

    expect(list2array(c)).toStrictEqual([1]);
  });

  test('merge two sorted lists - test case 4', async () => {
    const a = array2list([1]);
    const b = array2list([2]);
    const c = mergeTwoLists(a, b);

    expect(list2array(c)).toStrictEqual([1, 2]);
  });

  test('merge two sorted lists - test case 5', async () => {
    const a = array2list([1, 2, 4]);
    const b = array2list([2, 3, 4]);
    const c = mergeTwoLists(a, b);

    expect(list2array(c)).toStrictEqual([1, 2, 2, 3, 4, 4]);
  });
});
