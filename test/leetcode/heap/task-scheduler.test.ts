import fs from 'fs';
import path from 'path';
import { leastInterval } from '../../src/heap/task-scheduler';

describe('task scheduler', () => {
  test('task scheduler - test case 1', () => {
    // [A, B, _, A, B, _, A, B]
    expect(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 2)).toBe(8);
  });

  test('task scheduler - test case 2', () => {
    // [A, B, A, B, C, D]
    expect(leastInterval(['A', 'C', 'A', 'B', 'D', 'B'], 1)).toBe(6);
  });

  test('task scheduler - test case 3', () => {
    // [A, B, _, _, A, B, _, _, A, B]
    // [A, _, _, _, A, _, _, _]
    expect(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 3)).toBe(10);
  });

  test.skip('task scheduler - test case 4', async () => {
    const data = fs.readFileSync(path.join(__dirname, '__data__', 'task-scheduler.test.json')).toString();
    const tasks = JSON.parse(data);

    expect(leastInterval(tasks, 1)).toBe(1000);
  });
});
