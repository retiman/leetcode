import { array2list, list2array } from '../../src/linked-list/common/list-node';
import { addTwoNumbers } from '../../src/linked-list/add-two-numbers';

describe('add two numbers', () => {
  test('add two numbers - test case 1', async () => {
    const x = array2list([2, 4, 3]);
    const y = array2list([5, 6, 4]);
    const z = addTwoNumbers(x, y);

    expect(list2array(z)).toStrictEqual([7, 0, 8]);
  });

  test('add two numbers - test case 2', async () => {
    const x = array2list([9, 9, 9, 9, 9, 9, 9]);
    const y = array2list([9, 9, 9, 9]);
    const z = addTwoNumbers(x, y);

    expect(list2array(z)).toStrictEqual([8, 9, 9, 9, 0, 0, 0, 1]);
  });

  test('add two numbers - test case 3', async () => {
    const x = array2list([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    const y = array2list([5, 6, 4]);
    const z = addTwoNumbers(x, y);

    expect(list2array(z)).toStrictEqual([
      6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
    ]);
  });
});
