import { maximumSwap } from '../../src/array/maximum-swap';

describe('maximum swap', () => {
  test('maximumSwap - test case 1', () => {
    expect(maximumSwap(2736)).toEqual(7236);
  });

  test('maximumSwap - test case 2', () => {
    expect(maximumSwap(1993)).toEqual(9913);
  });

  test('maximumSwap - test case 1', () => {
    expect(maximumSwap(98368)).toEqual(98863);
  });
});
