import { minAddToMakeValid } from '../../src/stack/minimum-add-to-make-valid-parentheses';

describe('minimum add to make valid parentheses', () => {
  test('minAddToMakeValid - test case 1', async () => {
    expect(minAddToMakeValid('())')).toBe(1);
  });
});
