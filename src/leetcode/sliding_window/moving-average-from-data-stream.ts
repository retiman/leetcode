// DIFFICULTY: EASY
//
// Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.
//
// Implement the MovingAverage class:
//
// - MovingAverage(int size) Initializes the object with the size of the window size.
// - double next(int val) Returns the moving average of the last size values of the stream.
//
// See {@link https://leetcode.com/problems/moving-average-from-data-stream/}
export { MovingAverage };

// SOLUTION:
//
// This can be solved with a queue or sliding window.
class MovingAverage {
  private readonly size: number;
  private readonly window: number[];
  private sum: number;

  constructor(size: number) {
    this.size = size;
    this.window = [];
    this.sum = 0;
  }

  next(val: number): number {
    if (this.window.length === this.size) {
      const out = this.window.shift();
      this.sum -= out!;
    }

    this.window.push(val);
    this.sum += val;
    return this.sum / this.window.length;
  }
}
