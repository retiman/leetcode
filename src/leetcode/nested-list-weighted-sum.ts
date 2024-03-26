// This class definition comes from the problem itself and we cannot change it, or else our submission will not be
// accepted.
export class NestedInteger {
  private value: number | null;

  private values: NestedInteger[];

  // If value is provided, then it holds a single integer
  // Otherwise it holds an empty nested list
  constructor(value?: number) {
    this.value = value ?? null;
    this.values = [];
  }

  // Return true if this NestedInteger holds a single integer, rather than a nested list.
  isInteger(): boolean {
    return this.value !== null;
  }

  // Return the single integer that this NestedInteger holds, if it holds a single integer
  // Return null if this NestedInteger holds a nested list
  getInteger(): number | null {
    return this.value;
  }

  // Set this NestedInteger to hold a single integer equal to value.
  setInteger(value: number) {
    this.value = value;
  }

  //  Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
  add(elem: NestedInteger) {
    this.value = null;
    this.values.push(elem);
  }

  //  Return the nested list that this NestedInteger holds,
  // or an empty list if this NestedInteger holds a single integer
  getList(): NestedInteger[] {
    return this.values;
  }
}
