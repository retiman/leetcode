// DIFFICULTY: Hard
//
// Given an m x n board of characters and a list of strings words, return all words on the board.
//
// Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or
// vertically neighboring. The same letter cell may not be used more than once in a word.
//
// See https://leetcode.com/problems/word-search-ii/
describe('word search ii', () => {
  // This problem looks like it can be solved with a prefix trie.
  //
  // 1. Construct a prefix trie from the list of words.
  // 2. Run DFS from each board cell, choosing to continue the search if the sequence seen so far is a valid prefix in
  //    the trie.
  // 3. Collect valid words from each DFS and return the result.
  //
  // Easy peasy.
  function findWords(board: string[][], words: string[]): string[] {
    // Construct the prefix trie for efficient lookup.
    const root = new TrieNode();
    words.forEach(word => {
      root.add(word);
    });

    // Define a DFS function to run over each cell.  We could potentially make the DFS more efficient by creating the
    // visited matrix once and then mutating it over each DFS visitation.
    const result = new Set<string>();

    function __createdVisitedMatrix(matrix: string[][]) {
      const visited: boolean[][] = Array(matrix.length);
      for (let i = 0; i < matrix.length; i++) {
        visited[i] = Array(matrix[i].length).fill(false);
      }
      return visited;
    }

    function __dfs(node: TrieNode, visited: boolean[][], word: string, row: number, column: number) {
      // If we've reached the end of a word, do not return right away; we might be able to reach a longer word if we
      // keep going.  Record the one we've seen so far though.
      if (node.isTerminated) {
        result.add(word);
      }

      // The frontier nodes could be any direction up, down, left, or right, but not diagonal.
      const frontier = [
        [row + 1, column],
        [row - 1, column],
        [row, column + 1],
        [row, column - 1]
      ];
      for (const [x, y] of frontier) {
        // Do not consider this frontier cells that are out of bounds.
        if (x < 0 || x >= board.length) {
          continue;
        }

        // Do not consider this frontier cells that are out of bounds.
        if (y < 0 || y >= board[x].length) {
          continue;
        }

        // Do not consider visited cells.
        if (visited[x][y]) {
          continue;
        }

        // Do not consider cells that do not form a word.
        const c = board[x][y];
        if (!node.children.has(c)) {
          continue;
        }

        const next = node.children.get(c)!;

        // Mark this cell as visited, and continue the DFS search.  After the search completes, we should unmark visited
        // cells (unlike regular DFS) because a different direction may yield different words, so we'll want reconsider
        // these previously visited cells.
        visited[x][y] = true;
        __dfs(next, visited, word + c, x, y);
        visited[x][y] = false;
      }
    }

    // Perform DFS on every single cell.
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const c = board[i][j];
        if (!root.children.has(c)) {
          continue;
        }

        const visited = __createdVisitedMatrix(board);
        const node = root.children.get(c)!;

        // Note that the DFS function won't mark the current cell as visited; we'll have to do that manually.
        visited[i][j] = true;
        __dfs(node, visited, c, i, j);
      }
    }

    return [...result];
  }

  class TrieNode {
    public children = new Map<string, TrieNode>();

    public isTerminated = false;

    public add(word: string) {
      let node: TrieNode = this;

      for (let i = 0; i < word.length; i++) {
        const c = word.charAt(i);
        if (!node.children.has(c)) {
          node.children.set(c, new TrieNode());
        }
        node = node.children.get(c)!;
      }

      node.isTerminated = true;
    }
  }

  test('word search ii - test case 1', async () => {
    const board = [
      ['o', 'a', 'a', 'n'],
      ['e', 't', 'a', 'e'],
      ['i', 'h', 'k', 'r'],
      ['i', 'f', 'l', 'v']
    ];
    const words = ['oath', 'pea', 'eat', 'rain'];

    expect(findWords(board, words)).toMatchSnapshot();
  });

  test('word search ii - test case 2', async () => {
    const board = [
      ['a', 'b'],
      ['c', 'd']
    ];
    const words = ['abcb'];

    expect(findWords(board, words)).toStrictEqual([]);
  });

  test('word search ii - test case 3', async () => {
    const board = [['a', 'a']];
    const words = ['aaa'];

    expect(findWords(board, words)).toStrictEqual([]);
  });

  test('word search ii - test case 4', async () => {
    const board = [
      ['o', 'a', 'a', 'n'],
      ['e', 't', 'a', 'e'],
      ['i', 'h', 'k', 'r'],
      ['i', 'f', 'l', 'v']
    ];
    const words = ['oath', 'pea', 'eat', 'rain', 'hklf', 'hf'];

    expect(findWords(board, words)).toMatchSnapshot();
  });
});
