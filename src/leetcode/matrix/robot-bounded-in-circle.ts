// DIFFICULTY: MEDIUM
//
// On an infinite plane, a robot initially stands at (0, 0) and faces north. Note that:
//
// - The north direction is the positive direction of the y-axis.
// - The south direction is the negative direction of the y-axis.
// - The east direction is the positive direction of the x-axis.
// - The west direction is the negative direction of the x-axis.
//
// The robot can receive one of three instructions:
//
// - "G": go straight 1 unit.
// - "L": turn 90 degrees to the left (i.e., anti-clockwise direction).
// - "R": turn 90 degrees to the right (i.e., clockwise direction).
// - The robot performs the instructions given in order, and repeats them forever.
//
// Return true if and only if there exists a circle in the plane such that the robot never leaves the circle.
//
// See {@link https://leetcode.com/problems/robot-bounded-in-circle/}
export { isRobotBounded };

// SOLUTION:
//
// The problem is worded a little confusingly, but the gist is that if you can draw any circle around the robot's path
// then return true.  Otherwise, return false.
//
// Okay, so there are a few possibilities that can be put into two categories:
//
// 1. It follows the path and returns to the starting position.
// 2. It follows the path and does not return to the starting position.
//
// In the first case, regardless of what direction the robot is facing, it will follow the same path and return to the
// starting position again and again, so we can bound it with a circle.
//
// In the second case, it is *possible* that even if it's not in the starting position, it can follow a path that is
// bounded by a circle.  Let's explore the possibilities.
//
// - The direction the robot is facing is the same as the initial direction.  In this case, the robot will continue to
//   move in that same direction forever, making the path unbounded.
// - The direction the robot is facing is different from the initial direction.  In this case, the robot will follow
//   along a path that can be bounded by a circle.
//
// The second condition is true because the new direction is the new "north" for the robot, and it will eventually
// return to the origin following that path for 4 iterations.
function isRobotBounded(instructions: string): boolean {
  const directions = new Map([
    ['north', { x: 0, y: 1 }],
    ['east', { x: 1, y: 0 }],
    ['west', { x: -1, y: 0 }],
    ['south', { x: 0, y: -1 }]
  ]);

  // Simulate the robot's path.
  let [x, y] = [0, 0];
  let facing = 'north';
  for (const instruction of instructions) {
    if (instruction === 'G') {
      x += directions.get(facing)!.x;
      y += directions.get(facing)!.y;
    } else if (instruction === 'L') {
      facing = turnLeft(facing);
    } else if (instruction === 'R') {
      facing = turnRight(facing);
    }
  }

  // If the robot returned to the origin, then we are good to go.
  if (x === 0 && y === 0) {
    return true;
  }

  // If it didn't return to the origin, but we aren't facing the same direction as we started, then we are good to go.
  return facing !== 'north';
}

function turnLeft(facing: string) {
  switch (facing) {
    case 'north':
      return 'west';
    case 'east':
      return 'north';
    case 'west':
      return 'south';
    case 'south':
      return 'east';
    default:
      throw new Error();
  }
}

function turnRight(facing: string) {
  switch (facing) {
    case 'north':
      return 'east';
    case 'east':
      return 'south';
    case 'west':
      return 'north';
    case 'south':
      return 'west';
    default:
      throw new Error();
  }
}
