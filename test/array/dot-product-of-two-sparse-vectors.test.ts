import { SparseVector } from '../../src/array/dot-product-of-two-sparse-vectors';

describe('dot product of two sparse vectors', () => {
  test('dot product of two sparse vectors', async () => {
    const a = new SparseVector([1, 0, 0, 2, 3]);
    const b = new SparseVector([0, 3, 0, 4, 0]);

    expect(a.dotProduct(b)).toStrictEqual(8);
  });
});
