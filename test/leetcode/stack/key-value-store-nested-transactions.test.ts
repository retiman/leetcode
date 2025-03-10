import { KeyValueStore } from '../../src/stack/key-value-store-nested-transactions';

describe('key value store with nested transactions', () => {
  test('key value store with nested transactions - test case 1', async () => {
    const store = new KeyValueStore();

    store.set('a', 1);
    store.set('b', 2);
    store.set('c', 3);

    expect(store.get('a')).toBe(1);
    expect(store.get('b')).toBe(2);
    expect(store.get('c')).toBe(3);

    store.delete('c');

    expect(store.get('c')).toBeUndefined();
  });

  test('key value store with nested transactions - test case 2', async () => {
    const store = new KeyValueStore();

    store.set('a', 1);
    store.set('b', 2);
    store.set('c', 3);
    store.begin();
    store.set('a', 10);
    store.set('b', 20);
    store.delete('c');

    expect(store.get('a')).toBe(10);
    expect(store.get('b')).toBe(20);
    expect(store.get('c')).toBeUndefined();

    store.commit();

    expect(store.get('a')).toBe(10);
    expect(store.get('b')).toBe(20);
  });

  test('key value store with nested transactions - test case 3', async () => {
    const store = new KeyValueStore();

    store.set('a', 1);
    store.set('b', 2);
    store.set('c', 3);
    store.begin();
    store.set('a', 10);
    store.set('b', 20);
    store.delete('c');

    expect(store.get('a')).toBe(10);
    expect(store.get('b')).toBe(20);
    expect(store.get('c')).toBeUndefined();

    store.rollback();

    expect(store.get('a')).toBe(1);
    expect(store.get('b')).toBe(2);
    expect(store.get('c')).toBe(3);
  });

  test('key value store with nested transactions - test case 4', async () => {
    const store = new KeyValueStore();

    store.set('a', 1);
    store.begin();
    store.set('a', 10);
    store.begin();
    store.set('a', 100);

    expect(store.get('a')).toBe(100);

    store.commit();

    expect(store.get('a')).toBe(100);

    store.commit();

    expect(store.get('a')).toBe(100);
  });

  test('key value store with nested transactions - test case 5', async () => {
    const store = new KeyValueStore();

    store.set('a', 1);
    store.set('b', 2);
    store.begin();
    store.delete('a');
    store.set('b', 20);
    store.begin();
    store.set('a', 100);
    store.delete('b');

    expect(store.get('a')).toBe(100);
    expect(store.get('b')).toBeUndefined();

    store.rollback();

    expect(store.get('a')).toBeUndefined();
    expect(store.get('b')).toBe(20);

    store.rollback();

    expect(store.get('a')).toBe(1);
    expect(store.get('b')).toBe(2);
  });
});
