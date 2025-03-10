import { compress } from '../../src/two-pointer/string-compression';

describe('string compression', () => {
  test('string compression - test case 1', async () => {
    const cs = ['a', 'a', 'b', 'b', 'c', 'c', 'c'];

    const count = compress(cs);

    expect(cs.slice(0, count)).toStrictEqual(['a', '2', 'b', '2', 'c', '3']);
  });
});
