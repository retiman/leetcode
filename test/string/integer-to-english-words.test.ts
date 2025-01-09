import { numberToWords } from '../../src/string/integer-to-english-words';

describe('integer to english words', () => {
  test('integer to english words - test case 1', async () => {
    expect(numberToWords(123)).toBe('One Hundred Twenty Three');
  });

  test('integer to english words - test case 2', async () => {
    expect(numberToWords(12345)).toBe('Twelve Thousand Three Hundred Forty Five');
  });

  test('integer to english words - test case 3', async () => {
    expect(numberToWords(1234567)).toBe('One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven');
  });

  test('integer to english words - test case 4', async () => {
    expect(numberToWords(50868)).toBe('Fifty Thousand Eight Hundred Sixty Eight');
  });
});
