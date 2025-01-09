import { LRUCache } from '../../src/linked-list/lru-cache';

describe('lru cache', () => {
  test('lru cache - test case 1', async () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);
    cache.put(2, 2);

    expect(cache.get(1)).toBe(1);

    cache.put(3, 3);

    expect(cache.get(2)).toBe(-1);

    cache.put(4, 4);

    expect(cache.get(1)).toBe(-1);
    expect(cache.get(3)).toBe(3);
    expect(cache.get(4)).toBe(4);
  });

  test('lru cache - test case 2', async () => {
    const cache = new LRUCache(2);

    expect(cache.get(2)).toBe(-1);
    expect(cache.get(2)).toBe(-1);

    cache.put(2, 6);

    expect(cache.get(1)).toBe(-1);

    cache.put(1, 5);
    cache.put(1, 2);

    expect(cache.get(1)).toBe(2);
    expect(cache.get(2)).toBe(6);
  });

  test('lru cache - test case 3', async () => {
    const cache = new LRUCache(3);

    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    cache.put(4, 4);

    expect(cache.get(4)).toBe(4);
    expect(cache.get(3)).toBe(3);
    expect(cache.get(2)).toBe(2);
    expect(cache.get(1)).toBe(-1);

    cache.put(5, 5);

    expect(cache.get(1)).toBe(-1);
    expect(cache.get(2)).toBe(2);
    expect(cache.get(3)).toBe(3);
    expect(cache.get(4)).toBe(-1);
    expect(cache.get(5)).toBe(5);
  });
});
