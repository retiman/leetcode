// DIFFICULTY: Medium
//
// The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.
//
// For example, "ACGAATTCCG" is a DNA sequence.
// When studying DNA, it is useful to identify repeated sequences within the DNA.
//
// Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur
// more than once in a DNA molecule. You may return the answer in any order.
//
// See https://leetcode.com/problems/repeated-dna-sequences/
describe('repeated dna sequences', () => {
  function findRepeatedDnaSequences(s: string): string[] {
    if (s.length < 10) {
      return [];
    }

    const seen = new Set<string>();
    const repeated = new Set<string>();

    // We can use a sliding window to keep track of 10 character sequences, then if we have seen the sequence, add it
    // to the result.
    for (let left = 0, right = 9; right < s.length; right++) {
      // Two options exist here, because substring takes the leftmost element (inclusive) and rightmost element
      // (exclusive).
      //
      // i) We could calculate right - left + 1 to account for us slicing from [0, 9 + 1).
      // ii) We could start right = 10, then set the loop condition to be right <= s.length instead of just <.
      //
      // The second approach makes it easier to avoid off by 1, but we do this here to show you have to tackle the off
      // by 1 head on.
      if (right - left + 1 > 10) {
        left++;
      }

      const seq = s.substring(left, right + 1);
      if (seen.has(seq)) {
        repeated.add(seq);
      } else {
        seen.add(seq);
      }
    }

    return [...repeated];
  }

  test('repeated dna sequences - test case 1', async () => {
    expect(findRepeatedDnaSequences('AAAAAAAAAAAAA')).toStrictEqual(['AAAAAAAAAA']);
  });

  test('repeated dna sequences - test case 2', async () => {
    expect(findRepeatedDnaSequences('AAAAAAAAAAA')).toStrictEqual(['AAAAAAAAAA']);
  });
});
