// DIFFICULTY: Hard
//
// Design a data structure that simulates an in-memory file system.
//
// Implement the FileSystem class:
//
// - FileSystem()
//   Initializes the object of the system.
// - List<String> ls(String path)
//   If path is a file path, returns a list that only contains this file's name.
//   If path is a directory path, returns the list of file and directory names in this directory.
//   The answer should in lexicographic order.
// - void mkdir(String path)
//   Makes a new directory according to the given path. The given directory path does not exist.
//   If the middle directories in the path do not exist, you should create them as well.
// - void addContentToFile(String filePath, String content)
//   If filePath does not exist, creates that file containing given content.
//   If filePath already exists, appends the given content to original content.
// - String readContentFromFile(String filePath)
//   Returns the content in the file at filePath.
//
// See https://leetcode.com/problems/design-in-memory-file-system/
export { FileSystem };

// SOLUTION:
//
// The problem states that we can assume all inputs are valid, so we don't need to check if we try to mkdir on path
// parts that contain files, or otherwise list children of files.  We can also assume that all listed directories
// and files exist.
//
// Also, note that FileSystem shadows a built-in, so we'll have to suppress warnings about it.
class FileNode {
  public isFile = false;

  public content: string | undefined = undefined;

  public children = new Map<string, FileNode>();
}

class FileSystem {
  private readonly root = new FileNode();

  ls(path: string): string[] {
    let node = this.root;

    const parts = this.split(path);
    for (const part of parts) {
      if (!node.children.has(part)) {
        return [];
      }

      node = node.children.get(part)!;

      // Note that the ls function only wants to know the name of the file, not the absolute path, so don't bother
      // prefixing the parent path.
      if (node.isFile) {
        return [part];
      }
    }

    const children = [...node.children.keys()];
    children.sort((a, b) => a.localeCompare(b));
    return children;
  }

  mkdir(path: string): void {
    let node = this.root;

    const parts = this.split(path);
    for (const part of parts) {
      if (!node.children.has(part)) {
        node.children.set(part, new FileNode());
      }

      node = node.children.get(part)!;
    }
  }

  addContentToFile(filePath: string, content: string): void {
    let node = this.root;

    const parts = this.split(filePath);
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      // The problem isn't exactly clear here, but the assumption is that we also mkdir the paths if they do not
      // exist.
      if (!node.children.has(part)) {
        node.children.set(part, new FileNode());
      }

      node = node.children.get(part)!;

      // The very last part is the filename, so append the content.
      if (i === parts.length - 1) {
        const value = node.content === undefined ? '' : node.content;
        node.content = value + content;
        node.isFile = true;
      }
    }
  }

  readContentFromFile(filePath: string): string {
    let node = this.root;

    const parts = this.split(filePath);
    for (const part of parts) {
      node = node.children.get(part)!;
    }

    return node.content ?? '';
  }

  private split(path: string) {
    const normalized = path.endsWith('/') ? path.slice(0, path.length - 1) : path;
    return normalized.split('/');
  }
}
