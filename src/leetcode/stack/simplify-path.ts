// DIFFICULTY: MEDIUM
//
// You are given an absolute path for a Unix-style file system, which always begins with a slash '/'. Your task is to
// transform this absolute path into its simplified canonical path.
//
// The rules of a Unix-style file system are as follows:
//
// - A single period '.' represents the current directory.
// - A double period '..' represents the previous/parent directory.
// - Multiple consecutive slashes such as '//' and '///' are treated as a single slash '/'.
// - Any sequence of periods that does not match the rules above should be treated as a valid directory or file name.
//   For example, '...' and '....' are valid directory or file names.
//
// The simplified canonical path should follow these rules:
//
// - The path must start with a single slash '/'.
// - Directories within the path must be separated by exactly one slash '/'.
// - The path must not end with a slash '/', unless it is the root directory.
// - The path must not have any single or double periods ('.' and '..') used to denote current or parent directories.
//
// Return the simplified canonical path.
//
// See {@link https://leetcode.com/problems/simplify-path/description}
export { simplifyPath };

// SOLUTION:
//
// Just iterate through the path and use a stack to keep track of directories.  The only one we need to be careful with
// is the '..' name; this means we need to pop the last directory from the stack to "go up" one level.
//
// COMPLEXITY:
//
// Splitting the path, traversing segments, and joining the path are all O(n) time complexity.  Where n is the length of
// the input string.
//
// The space complexity is O(n) to store the string segments on the stack.  Worst case we have to store the length of
// the string.
function simplifyPath(path: string): string {
  const stack: string[] = [];
  const names = path.split('/');

  for (const name of names) {
    // Presumably these can just get ignored and thrown away.
    if (name === '' || name === '.') {
      continue;
    }

    // If we are going up a level, we need to pop the last directory from the stack.
    //
    // Wait, what happens if we are already at the root directory and we can't go up a directory anymore?  The
    // instructions are not clear, but we definitely do get inputs like '/../' and the result should be '/', indicating
    // that the desired behavior is to do nothing.
    if (name === '..') {
      // Technically we don't actually need this check; stack.pop() does nothing if the array is empty.
      if (stack.length > 0) {
        stack.pop();
      }

      continue;
    }

    // Otherwise we should just push the directory onto the stack as normal.
    stack.push(name);
  }

  return '/' + stack.join('/');
}
