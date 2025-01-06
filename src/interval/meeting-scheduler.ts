// DIFFICULTY: MEDIUM
//
// Given the availability time slots arrays slots1 and slots2 of two people and a meeting duration duration, return the
// earliest time slot that works for both of them and is of duration duration.
//
// If there is no common time slot that satisfies the requirements, return an empty array.
//
// The format of a time slot is an array of two elements [start, end] representing an inclusive time range from start to
// end.
//
// It is guaranteed that no two availability slots of the same person intersect with each other. That is, for any two
// time slots [start1, end1] and [start2, end2] of the same person, either start1 > end2 or start2 > end1.
//
// See {@link https://leetcode.com/problems/meeting-scheduler/}
export { minAvailableDuration };

// SOLUTION:
//
// To solve this, sort the intervals and use the two pointer technique to find a time slot that works for everybody.
function minAvailableDuration(slots1: number[][], slots2: number[][], duration: number): number[] {
  function compare(a: number[], b: number[]) {
    if (a[0] < b[0]) {
      return -1;
    }

    if (a[0] > b[0]) {
      return 1;
    }

    // If a[0] and b[0] are the same value, we can just compare based on a[1] and b[1], and a normal comparator will
    // give elements in ascending order via x - y.
    return a[1] - b[1];
  }

  slots1.sort(compare);
  slots2.sort(compare);

  let i = 0;
  let j = 0;
  while (i < slots1.length && j < slots2.length) {
    const a = slots1[i];
    const b = slots2[j];

    // The start time is the max of the two individuals start times; we can't start before the other person is ready.
    // The end time is the min of the two individuals end times; we can't end later than the other person's hard stop.
    const start = Math.max(a[0], b[0]);
    const end = Math.min(a[1], b[1]);

    // If we can accomodate the availability we should return the start time plus the duration; we shouldn't keep the
    // meeting longer than it needs to be.
    if (end - start >= duration) {
      return [start, start + duration];
    }

    // Otherwise, we should move the pointer for the person who has the earlier ending time; these times represent
    // availability, so if an earlier availability doesn't match the other person's later availability, we should
    // move the person with the earlier availability up.
    if (a[1] < b[1]) {
      i++;
    } else {
      j++;
    }
  }

  return [];
}
