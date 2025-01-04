// DIFFICULTY: Medium
//
// Given an array of characters chars, compress it using the following algorithm:
//
// Begin with an empty string s. For each group of consecutive repeating characters in chars:
//
// - If the group's length is 1, append the character to s.
// - Otherwise, append the character followed by the group's length.
//
// The compressed string s should not be returned separately, but instead, be stored in the input character array chars.
// Note that group lengths that are 10 or longer will be split into multiple characters in chars.
//
// After you are done modifying the input array, return the new length of the array.
//
// You must write an algorithm that uses only constant extra space.
//
// See {@link https://leetcode.com/problems/string-compression/}
export { compress };

// SOLUTION:
//
// Because we cannot use extra space, we will need to read and write to the array at the same time.  We can use the
// two pointer approach for doing so.
function compress(cs: string[]): number {
  let read = 0;
  let write = 0;

  while (read < cs.length) {
    // Keep track of the current character and the number of times it has appeared.
    const c = cs[read];
    let n = 0;

    // Consume the characters until we reach a point where the character differs.
    while (read < cs.length && cs[read] === c) {
      read++;
      n++;
    }

    // Write the current character and the number of times it appears.  We'll always have enough room because we'll
    // only need to write more than one digit if we have 10 or more characters.
    cs[write] = c;
    write++;

    // Only write digits if the count > 1; otherwise just leave the character as is.
    if (n > 1) {
      for (const digit of n.toString()) {
        cs[write] = digit;
        write++;
      }
    }
  }

  return write;
}
