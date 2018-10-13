const Stack = require('./Stack').Stack;
// 优先级，数字小代表优先级低
const priority = {
  '+': 1,
  '-': 1,
  '*': 2,
  '×': 2,
  '/': 2,
  // '(': 3,
  // ')': 3,
};

// 判断优先级
function isPriorityHigher(a, b) {
  return priority[a] > priority[b];
}

// 转换函数
function infixTosubfix(infixStr) {
  const infixArr = infixStr.split(' ');
  let subfixArr = [];
  const symbolStack = new Stack();
  for (let i = 0; i < infixArr.length; i ++) {
    if (!priority[infixArr[i]] && infixArr[i] !== '(' && infixArr[i] !== ')') {
      subfixArr.push(infixArr[i]);
    }
    while(priority[infixArr[i]] !== undefined) {
      if (symbolStack.isEmpty() || symbolStack.top() === '(') {
        symbolStack.push(infixArr[i]);
        break;
      } else if (isPriorityHigher(infixArr[i], symbolStack.top())) {
        symbolStack.push(infixArr[i]);
        break;
      } else {
        subfixArr.push(symbolStack.pop());
      }
    }
    if (infixArr[i] === '(') {
      symbolStack.push('(');
    } else if (infixArr[i] === ')') {
      do {
        subfixArr.push(symbolStack.pop());
      } while(symbolStack.top() !== '(');
      symbolStack.pop();
    }
  }
  while(!symbolStack.isEmpty()) {
    subfixArr.push(symbolStack.pop());
  }
  return subfixArr.join(' ');
}

const infix = '1 + ( ( 2 + 3 ) × 4 ) - 5';
console.log(infixTosubfix(infix));