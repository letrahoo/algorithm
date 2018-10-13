// 解决处理符号成对问题
// 后缀表达式
// 

exports.Stack = class Stack {
  constructor() {
    this.stackStore = [];
  }

  pop() {
    return this.stackStore.pop();
  }

  push(item) {
    return this.stackStore.push(item);
  }

  top() {
    return this.stackStore[this.stackStore.length - 1];
  }

  isEmpty() {
    return this.stackStore.length === 0;
  }

  clear() {
    if(!this.isEmpty()) {
      this.pop();
    }
  }

  display() {
    console.log(this.stackStore.toString());
  }

  size() {
    console.log(this.stackStore.length);
  }
}