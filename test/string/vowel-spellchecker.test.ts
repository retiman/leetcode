import { spellchecker } from '../../src/string/vowel-spellchecker';

describe('vowel spellchecker', () => {
  test('vowel spellchecker - test case 1', async () => {
    const wordlist = ['KiTe', 'kite', 'hare', 'Hare'];
    const queries = ['kite', 'Kite', 'KiTe', 'Hare', 'HARE', 'Hear', 'hear', 'keti', 'keet', 'keto'];

    expect(spellchecker(wordlist, queries)).toStrictEqual([
      'kite',
      'KiTe',
      'KiTe',
      'Hare',
      'hare',
      '',
      '',
      'KiTe',
      '',
      'KiTe'
    ]);
  });
});
