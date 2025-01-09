import { nearestPalindromic } from '../../src/string/find-the-closest-palindrome';

describe('find the closest palindrome', () => {
  test('nearest palindromic - test case 1', async () => {
    expect(nearestPalindromic('1234')).toBe('1221');
  });

  test('nearest palindromic - test case 2', async () => {
    expect(nearestPalindromic('123')).toBe('121');
  });

  test('nearest palindromic - test case 3', async () => {
    expect(nearestPalindromic('1')).toBe('0');
  });

  test('nearest palindromic - test case 4', async () => {
    expect(nearestPalindromic('10')).toBe('9');
  });

  test('nearest palindromic - test case 5', async () => {
    expect(nearestPalindromic('11911')).toBe('11811');
  });

  test('nearest palindromic - test case 6', async () => {
    expect(nearestPalindromic('100')).toBe('99');
  });

  test('nearest palindromic - test case 7', async () => {
    expect(nearestPalindromic('11011')).toBe('11111');
  });

  test('nearest palindromic - test case 8', async () => {
    expect(nearestPalindromic('111111111')).toBe('111101111');
  });
});
