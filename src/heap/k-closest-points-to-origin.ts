// DIFFICULTY: Medium
//
// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the
// k closest points to the origin (0, 0).
//
// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
//
// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
//
// See {@link https://leetcode.com/problems/k-closest-points-to-origin/}
export { kClosest };

// SOLUTION:
function kClosest(points: number[][], k: number): number[][] {
    // Custom comparator for max-heap based on distance
    const distance = (point: number[]) => point[0] ** 2 + point[1] ** 2;

    // Use a max-heap (implemented as a sorted array)
    const maxHeap: number[][] = [];

    for (const point of points) {
        // Push the point into the heap
        maxHeap.push(point);

        // Sort based on distance in descending order (max-heap)
        maxHeap.sort((a, b) => distance(b) - distance(a));

        // If heap size exceeds k, remove the farthest point
        if (maxHeap.length > k) {
            maxHeap.pop();
        }
    }

    // Return the k closest points
    return maxHeap;
}