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
function simplifyPath(path: string): string {
  const stack: string[] = [];
  const names = path.split('/');

  for (const name of names) {
    // Presumably these can just get ignored and thrown away.
    if (name === '' || name === '.') {
      continue;
    }

    // Go up a level.
    //
    // The instructions don't explain what to do if you are already at the root directory and pop.  Let's assume it
    // never happens.
    if (name === '..') {
      stack.pop();
    }
    // Otherwise, just keep on going on.
    else {
      stack.push(name);
    }
  }

  return '/' + stack.join('/');
}
