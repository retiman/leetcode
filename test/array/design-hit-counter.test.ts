// DIFFICULTY: Medium
//
// Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).
//
// Your system should accept a timestamp parameter (in seconds granularity), and you may assume that calls are being
// made to the system in chronological order (i.e., timestamp is monotonically increasing). Several hits may arrive
// roughly at the same time.
//
// See https://leetcode.com/problems/design-hit-counter/
describe('group anagrams', () => {
  // To do this efficiently we'll have to use a circular array buffer.  This is the same technique used by time series
  // databases.
  class HitCounter {
    private readonly hits: number[];

    private readonly timestamps: number[];

    constructor() {
      // Our granularity is seconds, so in theory, we only need to store only the last 300 seconds.  Keep track of both
      // hits by timestamp.
      this.hits = Array(300).fill(0);
      this.timestamps = Array(300).fill(0);
    }

    hit(timestamp: number): void {
      const i = timestamp % 300;

      // If we've already recorded a hit at this timestamp, increment it.
      if (this.timestamps[i] === timestamp) {
        this.hits[i]++;
        return;
      }

      // Otherwise record this timestamp and set the current hit counter to 1.
      this.timestamps[i] = timestamp;
      this.hits[i] = 1;
    }

    getHits(timestamp: number): number {
      let count = 0;

      for (let i = 0; i < this.hits.length; i++) {
        if (timestamp - this.timestamps[i] < 300) {
          count += this.hits[i];
        }
      }

      return count;
    }
  }

  test('test case 1', async () => {
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
