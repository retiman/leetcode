import { AllOne } from '../../src/linked-list/all-one';

describe('all O`one data structure', () => {
  test('all one data structure - test case 1', async () => {
    const allone = new AllOne();
    allone.inc('hello');
    allone.inc('hello');

    expect(allone.getMaxKey()).toBe('hello');
    expect(allone.getMinKey()).toBe('hello');

    allone.inc('leet');

    expect(allone.getMaxKey()).toBe('hello');
    expect(allone.getMinKey()).toBe('leet');
  });

  test('all one data structure - test case 2', async () => {
    const allone = new AllOne();
    allone.inc('a');
    allone.inc('b');
    allone.inc('b');
    allone.inc('c');
    allone.inc('c');
    allone.inc('c');
    allone.dec('b');
    allone.dec('b');

    expect(allone.getMinKey()).toBe('a');

    allone.dec('a');

    expect(allone.getMaxKey()).toBe('c');
    expect(allone.getMinKey()).toBe('c');
  });
});
