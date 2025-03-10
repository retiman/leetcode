import { minRemoveToMakeValid } from '../../src/stack/minimum-remove-to-make-valid-parentheses';

describe('minimum remove to make valid parentheses', () => {
  test('minimum remove to make valid parentheses - test case 1', async () => {
    expect(minRemoveToMakeValid('lee(t(c)o)de)')).toBe('lee(t(c)o)de');
  });
});
