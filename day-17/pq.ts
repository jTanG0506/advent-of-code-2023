const TOP = 0;
const PARENT = (i: number) => ((i + 1) >>> 1) - 1;
const LEFT = (i: number) => (i << 1) + 1;
const RIGHT = (i: number) => (i + 1) << 1;

export class PriorityQueue<T> {
  private _comparator: (a: T, b: T) => boolean;
  private _heap: T[];

  constructor(comparator = (a: T, b: T) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }

  size() {
    return this._heap.length;
  }

  isEmpty() {
    return this.size() == 0;
  }

  peek() {
    return this._heap[TOP];
  }

  push(...values: T[]) {
    values.forEach((value) => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }

  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > TOP) {
      this._swap(TOP, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }

  replace(value: T) {
    const replacedValue = this.peek();
    this._heap[TOP] = value;
    this._siftDown();
    return replacedValue;
  }

  _greater(i: number, j: number) {
    return this._comparator(this._heap[i], this._heap[j]);
  }

  _swap(i: number, j: number) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

  _siftUp() {
    let node = this.size() - 1;
    while (node > TOP && this._greater(node, PARENT(node))) {
      this._swap(node, PARENT(node));
      node = PARENT(node);
    }
  }

  _siftDown() {
    let node = TOP;
    while (
      (LEFT(node) < this.size() && this._greater(LEFT(node), node)) ||
      (RIGHT(node) < this.size() && this._greater(RIGHT(node), node))
    ) {
      let maxChild =
        RIGHT(node) < this.size() && this._greater(RIGHT(node), LEFT(node))
          ? RIGHT(node)
          : LEFT(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}
