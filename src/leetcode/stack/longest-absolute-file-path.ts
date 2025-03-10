// DIFFICULTY: MEDIUM
//
// Suppose we have a file system that stores both files and directories. An example of one system is represented in the
// following picture:
//
// Here, we have `dir` as the only directory in the root. `dir` contains two subdirectories, `subdir1` and `subdir2`.
// `subdir1` contains a file `file1.ext` and subdirectory `subsubdir1`. `subdir2` contains a subdirectory `subsubdir2`,
// which contains a file `file2.ext`.
//
// In text form, it looks like this (with ⟶ representing the tab character):
//
// dir
// ⟶ subdir1
// ⟶ ⟶ file1.ext
// ⟶ ⟶ subsubdir1
// ⟶ subdir2
// ⟶ ⟶ subsubdir2
// ⟶ ⟶ ⟶ file2.ext
//
// If we were to write this representation in code, it will look like this:
//
// - "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext".
//
// Note that the '\n' and '\t' are the new-line and tab characters.
//
// Every file and directory has a unique absolute path in the file system, which is the order of directories that must
// be opened to reach the file/directory itself, all concatenated by '/'s. Using the above example, the absolute path
// to file2.ext is "dir/subdir2/subsubdir2/file2.ext". Each directory name consists of letters, digits, and/or spaces.
// Each file name is of the form name.extension, where name and extension consist of letters, digits, and/or spaces.
//
// Given a string input representing the file system in the explained format, return the length of the longest absolute
// path to a file in the abstracted file system. If there is no file in the system, return 0.
//
// Note that the testcases are generated such that the file system is valid and no file or directory name has length 0.
//
// See {@link https://leetcode.com/problems/longest-absolute-file-path/}
export { lengthLongestPath };

// SOLUTION:
//
// A solution can be efficient by using a stack to keep track of directory depth.  However, this only works if the
// input does not contain duplicate sub directories, and all of the files appear right after the subdirectory they are
// in.  If it turns out the input can vary such that files and subdirectories appear out of order, or the
// subdirectories can contain duplicates, we'll have to actually build out a real filesystem structure using a graph
// of FileNode (with strings mapping to subdirectory FileNodes).
//
// In this solution, we will assume that the input is constrained.
function lengthLongestPath(input: string): number {
  // This is a stack that will keep track of where we are in the directory structure.  We'll assume that every
  // directory has a trailing slash (no leading slash).  We never calculate directory lengths, so that will never
  // mess up our calculation.
  const dirs: string[] = [];

  // The current and max file lengths.
  let current = 0;
  let max = 0;

  const parts = input.split('\n');
  for (const part of parts) {
    // This indicates that the part of the text is in some subdirectory; we should locate the subdirectory by popping
    // directories off of the stack.  This will put us at the correct subdirectory after all the popping.
    //
    // The number of tabs tells us how many elements should be in the stack; if there are no tabs, the last index is
    // -1.  If there is 1 tab, the index is 0, and so the number of levels will be the last index + 1.
    const levels = part.lastIndexOf('\t') + 1;
    if (levels !== -1) {
      // Pop directories off the stack until it matches levels.
      while (dirs.length > levels) {
        const dir = dirs.pop()!;
        current -= dir.length;
      }
    }

    // To get the name of the file, we replace all the tabs with empty string.  We can also slice the string starting
    // from the original value of levels.
    const name = levels === -1 ? part : part.slice(levels);

    // This indicates that the part of the text is a file, so we should calculate the file length.
    if (name.includes('.')) {
      max = Math.max(max, current + name.length);
      continue;
    }

    // If it doesn't start with a tab or contain a dot, that means we are looking at a directory, so we should push
    // it onto the stack.
    //
    // Add 1 to the value to account for the trailing slash (there is no leading slash).
    dirs.push(`${name}/`);
    current += name.length + 1;
  }

  return max;
}
