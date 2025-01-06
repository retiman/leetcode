// DIFFICULTY: EASY
//
// You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two
// adjacent and equal letters and removing them.
//
// We repeatedly make duplicate removals on s until we no longer can.
//
// Return the final string after all such duplicate removals have been made. It can be proven that the answer is unique.
//
// See https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/
describe('remove all adjacent duplicates i', () => {
  function removeDuplicates(s: string) {
    const stack: string[] = [];

    for (const c of s) {
      // If the top of the stack has a dupe, pop it off and ignore this character.
      if (stack.length !== 0 && c === stack[stack.length - 1]) {
        stack.pop();
        continue;
      }

      // Otherwise push the character on the stack.
      stack.push(c);
    }

    // We'll end up with all the non-dupes.
    return stack.join('');
  }

  test('remove all adjacent duplicates i - test case 1', async () => {
    expect(removeDuplicates('abbaca')).toBe('ca');
  });
});
