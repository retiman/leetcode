// DIFFICULTY: Medium
//
// Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).
//
// Your system should accept a timestamp parameter (in seconds granularity), and you may assume that calls are being
// made to the system in chronological order (i.e., timestamp is monotonically increasing). Several hits may arrive
// roughly at the same time.
//
// See {@link https://leetcode.com/problems/design-hit-counter/}
export { HitCounter };

// SOLUTION:
//
// To do this efficiently we'll have to use a circular array buffer.  This is the same technique used by time series
// databases.
//
// COMPLEXITY:
//
// Both methods run in O(1) time since we fix the array size at 300.
interface HitEvent {
  timestamp: number;
  hits: number;
}

class HitCounter {
  private readonly events: HitEvent[];

  constructor() {
    // Our granularity is seconds, so in theory, we only need to store only the last 300 seconds.  Keep track of both
    // hits by timestamp.
    this.events = [];

    // Don't use Array.fill() here; you'll fill the array with 300 copies of the same object.
    for (let i = 0; i < 300; i++) {
      this.events[i] = {
        timestamp: 0,
        hits: 0
      };
    }
  }

  hit(timestamp: number): void {
    // Find the event in our circular buffer that would correspond to this timestamp.
    const i = timestamp % 300;
    const event = this.events[i];

    // If we've already recorded hits at this timestamp, increment it.
    if (event.timestamp === timestamp) {
      event.hits++;
      return;
    }

    // Otherwise, we haven't, so set the hits to 1.
    event.timestamp = timestamp;
    event.hits = 1;
  }

  getHits(timestamp: number): number {
    let count = 0;

    for (const event of this.events) {
      if (timestamp - event.timestamp < 300) {
        count += event.hits;
      }
    }

    return count;
  }
}
