import { isRobotBounded } from '../../src/matrix/robot-bounded-in-circle';

describe('robot bounded in circle', () => {
  test('isRobotBounded - test case 1', () => {
    const instructions = 'GGLLGG';

    expect(isRobotBounded(instructions)).toEqual(true);
  });
});
