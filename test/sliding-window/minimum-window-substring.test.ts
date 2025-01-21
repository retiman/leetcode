import { minWindow } from '../../src/sliding-window/minimum-window-substring';

describe('minimum window substring', () => {
  test('minWindow - test case 1', async () => {
    expect(minWindow('ADOBECODEBANC', 'ABC')).toStrictEqual('BANC');
  });
});
