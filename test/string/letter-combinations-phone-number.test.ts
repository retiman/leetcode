// DIFFICULTY: Medium
//
// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
//
// A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
//
// See https://leetcode.com/problems/letter-combinations-of-a-phone-number/
describe('letter combinations of a phone number', () => {
  function letterCombinations(digits: string): string[] {
    const map = new Map<string, string[]>();
    map.set('1', []);
    map.set('2', ['a', 'b', 'c']);
    map.set('3', ['d', 'e', 'f']);
    map.set('4', ['g', 'h', 'i']);
    map.set('5', ['j', 'k', 'l']);
    map.set('6', ['m', 'n', 'o']);
    map.set('7', ['p', 'q', 'r', 's']);
    map.set('8', ['t', 'u', 'v']);
    map.set('9', ['w', 'x', 'y', 'z']);
    map.set('0', [' ']);

    // This can be done recursively; first generate all combinations for string of digits minus the head digit.  Then add
    // letters to each combination of the rest.
    function generate(text: string): string[] {
      if (text.length === 0) {
        return [];
      }

      if (text.length === 1) {
        return map.get(text)!;
      }

      // Separate the first digit and the rest of the digits.
      const first = text[0];
      const rest = text.slice(1);

      // Find all combinations of words possible just from the rest of the digits.
      const combinations = generate(rest);

      // Now insert the letters possible from the first digit in front of each combination.
      const letters = map.get(first)!;
      const result = [];
      for (let i = 0; i < combinations.length; i++) {
        const combination = combinations[i];
        for (let j = 0; j < letters.length; j++) {
          const letter = letters[j];
          result.push(letter + combination);
        }
      }

      return result;
    }

    return generate(digits);
  }

  function __run(digits: string): Set<string> {
    return new Set(letterCombinations(digits));
  }

  test('run', async () => {
    expect(__run('')).toStrictEqual(new Set());
    expect(__run('2')).toStrictEqual(new Set(['a', 'b', 'c']));
    expect(__run('23')).toStrictEqual(new Set(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']));
  });
});
