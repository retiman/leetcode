import { parallelize } from '../../src/graph/parallel-job-scheduling';

describe('parallel job scheduling', () => {
  test('parallel job scheduling - test case 1', async () => {
    const jobs = ['A:B,C', 'B:D,E,F'];

    expect(parallelize(jobs)).toMatchSnapshot();
  });

  test('parallel job scheduling - test case 2', async () => {
    const jobs = ['A:B,C', 'B:D,E', 'F:G'];

    expect(parallelize(jobs)).toMatchSnapshot();
  });
});
