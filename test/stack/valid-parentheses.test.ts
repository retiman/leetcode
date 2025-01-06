import { isValid } from '../../src/stack/valid-parentheses';

describe('valid parentheses', () => {
  test('valid parentheses - test case 1', async () => {
    expect(isValid('()')).toBe(true);
  });

  test('valid parentheses - test case 2', async () => {
    expect(isValid('()[]{}')).toBe(true);
  });

  test('valid parentheses - test case 3', async () => {
    expect(isValid('(}')).toBe(false);
  });
});
