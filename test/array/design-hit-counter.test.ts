import { HitCounter } from '../../src/array/design-hit-counter';

describe('design hit counter', () => {
  test('design hit counter - test case 1', async () => {
    const counter = new HitCounter();

    counter.hit(1);
    counter.hit(2);
    counter.hit(3);

    expect(counter.getHits(4)).toBe(3);

    counter.hit(300);

    expect(counter.getHits(300)).toBe(4);
    expect(counter.getHits(301)).toBe(3);
  });
});
