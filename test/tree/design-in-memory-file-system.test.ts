import { FileSystem } from '../../src/tree/design-in-memory-file-system';

describe('design in memory file system', () => {
  test('design in memory file system - test case 1', async () => {
    const fs = new FileSystem();

    expect(fs.ls('/')).toStrictEqual([]);

    fs.mkdir('/a/b/c');
    fs.addContentToFile('/a/b/c/d', 'hello');

    expect(fs.ls('/')).toStrictEqual(['a']);
    expect(fs.readContentFromFile('/a/b/c/d')).toBe('hello');
  });
});
