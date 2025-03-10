import { letterCombinations } from '../../src/string/letter-combinations-phone-number';

describe('letter combinations of a phone number', () => {
  test('letter combinations - test case 1', async () => {
    const letters = new Set(letterCombinations(''));

    expect(letters).toStrictEqual(new Set());
  });

  test('letter combinations - test case 2', async () => {
    const letters = new Set(letterCombinations('2'));

    expect(letters).toStrictEqual(new Set(['a', 'b', 'c']));
  });

  test('letter combinations - test case 3', async () => {
    const letters = new Set(letterCombinations('23'));

    expect(letters).toStrictEqual(new Set(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']));
  });
});
