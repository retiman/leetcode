# DIFFICULTY: MEDIUM
#
# On an infinite plane, a robot initially stands at (0, 0) and faces north. Note that:
#
# - The north direction is the positive direction of the y-axis.
# - The south direction is the negative direction of the y-axis.
# - The east direction is the positive direction of the x-axis.
# - The west direction is the negative direction of the x-axis.
#
# The robot can receive one of three instructions:
#
# - "G": go straight 1 unit.
# - "L": turn 90 degrees to the left (i.e., anti-clockwise direction).
# - "R": turn 90 degrees to the right (i.e., clockwise direction).
# - The robot performs the instructions given in order, and repeats them forever.
#
# Return true if and only if there exists a circle in the plane such that the robot never leaves the circle.
#
# See https://leetcode.com/problems/robot-bounded-in-circle
class Solution:
    def isRobotBounded(self, instructions: str) -> bool:
        """
        SOLUTION
        --------

        The problem is worded a little confusingly, but the gist is that if you can draw any circle around the robot's
        path then return true.  Otherwise, return false.

        Okay, so there are a few possibilities that can be put into two categories:

        1. It follows the path and returns to the starting position.
        2. It follows the path and does not return to the starting position.

        In the first case, regardless of what direction the robot is facing, it will follow the same path and return to
        the starting position again and again, so we can bound it with a circle.

        In the second case, it is *possible* that even if it's not in the starting position, it can follow a path that
        is bounded by a circle.  Let's explore the possibilities.

        - The direction the robot is facing is the same as the initial direction.  In this case, the robot will continue
          to move in that same direction forever, making the path unbounded.
        - The direction the robot is facing is different from the initial direction.  In this case, the robot will
          follow along a path that can be bounded by a circle.

        The second condition is true because the new direction is the new "north" for the robot, and it will eventually
        return to the origin following that path for 4 iterations.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of instructions.

        Space complexity is O(1).
        """
        directions = {"N": (0, 1), "E": (1, 0), "S": (0, -1), "W": (-1, 0)}

        leftTurns = {"N": "W", "W": "S", "S": "E", "E": "N"}

        rightTurns = {"N": "E", "E": "S", "S": "W", "W": "N"}

        (x, y) = (0, 0)
        facing = "N"

        for instruction in instructions:
            if instruction == "G":
                dx, dy = directions[facing]
                x += dx
                y += dy
            elif instruction == "L":
                facing = leftTurns[facing]
            elif instruction == "R":
                facing = rightTurns[facing]

        # If the robot returned to the origin, or it's facing a different direction than the initial direction, then we
        # are good to go.
        return (x == 0 and y == 0) or facing != "N"
