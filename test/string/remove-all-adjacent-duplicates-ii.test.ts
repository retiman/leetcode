// DIFFICULTY: Medium
//
// You are given a string s and an integer k, a k duplicate removal consists of choosing k adjacent and equal letters
// from s and removing them, causing the left and the right side of the deleted substring to concatenate together.
//
// We repeatedly make k duplicate removals on s until we no longer can.
//
// Return the final string after all such duplicate removals have been made. It is guaranteed that the answer is unique.
//
// See https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/
describe('remove all adjacent duplicates ii', () => {
  // In contrast with remove duplicates i, we need to keep track of not just the top element of the stack, but rather if
  // the top k elements constitute dupes.  Once we remove k elements, it's possible the new stack now has k more
  // elements to remove.
  //
  // To account for this, we cannot simply count elements and remove when we see k, resetting out counter to 1.  Instead
  // we will have to store, at each stack frame, the elements *and* what the counter was.
  function removeDuplicates(s: string, k: number) {
    interface Character {
      value: string;
      count: number;
    }

    const stack: Character[] = [];
    let count = 1;

    for (const c of s) {
      // If the top of the stack and the current character match, increase our count.  If they don't match, reset our
      // count so that it is 1 (since we always at least see 1 match; the character itself).
      if (stack.length !== 0 && c === stack[stack.length - 1].value) {
        count++;
      } else {
        count = 1;
      }

      stack.push({
        value: c,
        count
      });

      // Only if we've seen k dupes, pop them all.  Here, we cannot reset our counter back to 1; we have to reset the
      // counter back to what it was when we first pushed the top element onto the stack.
      if (count === k) {
        for (let i = 0; i < k; i++) {
          stack.pop();
        }

        // Reset our count.  If we have no more stack elements, we can reset to 1.  However, if we have stack elements,
        // we have to reset to what it was previously.
        if (stack.length === 0) {
          count = 1;
        } else {
          count = stack[stack.length - 1].count;
        }
      }
    }

    // We'll end up with all the non-dupes.
    return stack.map(c => c.value).join('');
  }

  test('remove all adjacent duplicates ii - test case 1', async () => {
    expect(removeDuplicates('abcd', 2)).toBe('abcd');
  });

  test('remove all adjacent duplicates ii - test case 2', async () => {
    expect(removeDuplicates('deeedbbcccbdaa', 3)).toBe('aa');
  });
});
