// DIFFICULTY: Easy
//
// A string can be abbreviated by replacing any number of non-adjacent, non-empty substrings with their lengths. The
// lengths should not have leading zeros.
//
// For example, a string such as "substitution" could be abbreviated as (but not limited to):
//
// "s10n" ("s ubstitutio n")
// "sub4u4" ("sub stit u tion")
// "12" ("substitution")
// "su3i1u2on" ("su bst i t u ti on")
// "substitution" (no substrings replaced)
// The following are not valid abbreviations:
//
// "s55n" ("s ubsti tutio n", the replaced substrings are adjacent)
// "s010n" (has leading zeros)
// "s0ubstitution" (replaces an empty substring)
// Given a string word and an abbreviation abbr, return whether the string matches the given abbreviation.
//
// A substring is a contiguous non-empty sequence of characters within a string.
//
// See https://leetcode.com/problems/valid-word-abbreviation/
describe('valid word abbreviation', () => {
  function validWordAbbreviation(word: string, abbr: string): boolean {
    let [i, j] = [0, 0];

    function isDigit(c: string) {
      // Number(x) will stop on invalid characters anywhere in the string, but Number.parseInt(x) will keep going until
      // it finds a non-digit.  We expect the entire input to be a number.
      return !Number.isNaN(Number(c));
    }

    while (i < word.length && j < abbr.length) {
      // Substitutions with leading zeroes (or replace an empty substring) are not valid.  The word string can only
      // contain non-numeric characters, so this can never match.
      if (abbr[j] === '0') {
        return false;
      }

      // If it is a digit, perform the substitution by advancing the word pointer by the number of digits we read.
      if (isDigit(abbr[j])) {
        let num = 0;

        // We should collect digits into a number, and then do the advancement.
        while (j < abbr.length && isDigit(abbr[j])) {
          num = num * 10 + Number(abbr[j]);
          j++;
        }

        i += num;
        continue;
      }

      // If it's not a digit, we check if the characters match.  If they don't, it's not a valid substitution.
      if (word[i] !== abbr[j]) {
        return false;
      }

      i++;
      j++;
    }

    // We need to have advanced PAST the last character in each string for it to be valid.  The last character is
    // checked on line 55, and the pointers advance one more time afterwards.  Hence we should not subtract 1 from
    // word.length or abbr.length.
    return i === word.length && j === abbr.length;
  }

  test('valid word abbreviation - test case 1', async () => {
    expect(validWordAbbreviation('substitition', 's10n')).toBe(true);
  });
});