// CATEGORY: Stack
//
// Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i]
// is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for
// which this is possible, keep answer[i] == 0 instead.
//
// See https://leetcode.com/problems/daily-temperatures/
describe('daily temperature', () => {
  function dailyTemperatures(ts: number[]): number[] {
    const stack: number[] = [];
    const result: number[] = new Array(ts.length).fill(0);

    for (let i = 0; i < ts.length; i++) {
      while (stack.length > 0 && ts[i] > ts[stack[stack.length - 1]]) {
        const prevIndex = stack.pop()!;
        result[prevIndex] = i - prevIndex;
      }
      stack.push(i);
    }

    return result;
  }
  test('run', async () => {
    expect(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])).toStrictEqual([1, 1, 4, 2, 1, 1, 0, 0]);
  });
});
