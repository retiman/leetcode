// DIFFICULTY: Easy
//
// Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all
// meetings.
//
// See {@link https://leetcode.com/problems/meeting-rooms/}
export { canAttendMeetings };

// SOLUTION:
//
// See the merge intervals problem for a more detailed solution.
function canAttendMeetings(intervals: number[][]): boolean {
  function compare(a: number[], b: number[]) {
    if (a[0] < b[0]) {
      return -1;
    }

    if (a[0] > b[0]) {
      return 1;
    }

    return a[1] - b[1];
  }

  function isOverlap(a: number[], b: number[]) {
    if (a[1] <= b[0]) {
      return false;
    }

    return true;
  }

  if (intervals.length <= 1) {
    return true;
  }

  intervals.sort((a, b) => compare(a, b));
  for (let i = 1; i < intervals.length; i++) {
    const previous = intervals[i - 1];
    const current = intervals[i];
    if (isOverlap(previous, current)) {
      return false;
    }
  }

  return true;
}
