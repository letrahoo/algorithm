exports.Queue = class Queue {
  constructor() {
    this.queueStore = [];
  }

  isEmpty() {
    return this.queueStore.length === 0;
  }

  enqueue(item) {
    this.queueStore.push(item);
  }

  dequeue() {
    if (this.isEmpty()) {
      throw Error('The queue is empty');
    } else {
      return this.queueStore.unshift();
    }
  }

  clear() {
    if (!this.isEmpty()) {
      this.dequeue();
    }
  }

  front() {
    if (this.isEmpty()) {
      throw Error('The queue is empty');
    } else {
      return this.queueStore[0];
    }
  }

  end() {
    if (this.isEmpty()) {
      throw Error('The queue is empty');
    } else {
      return this.queueStore[this.queueStore.length - 1];
    }
  }

  display() {
    console.log(this.queueStore.toString());
  }
};