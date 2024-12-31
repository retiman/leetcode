import { productExceptSelf } from '../../src/prefix-sum/product-of-array-except-self';

describe('product of array except self', () => {
  test('product except self - test case 1', async () => {
    expect(productExceptSelf([0, 2, 3, 4])).toStrictEqual([24, 0, 0, 0]);
    expect(productExceptSelf([1, 2, 3, 4])).toStrictEqual([24, 12, 8, 6]);
  });
});
