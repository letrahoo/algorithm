class PNode {
  constructor(coeff, exp) {
    this.coeff = coeff;
    this.exp = exp;
    this.next = null;
  }

  copy() {
    return new PNode(this.coeff, this.exp);
  }

  combineCopy(pNode) {
    if (pNode.exp === this.exp) {
      return new PNode(this.coeff + pNode.coeff, this.exp);
    } else {
      throw Error('cannot combine');
    }
  }

}

class Head {
  constructor(name) {
    this.name = name;
    this.next = null;
  }
}

class PolynomialList {
  constructor(name) {
    this.head = new Head(name);
  }

  insert(newNode, position) {
    if (position < 0) {
      return false
    }
    let currentNode = this.head;
    let index = -1;
    while((++index) < position) {
      if (currentNode.next !== null) {
        currentNode = currentNode.next;
      } else {
        return false;
      }
    }
    newNode.next = currentNode.next;
    currentNode.next = newNode;
    return true;
  }

  display() {
    const name = this.head.name;
    let str = `${name}:`;
    let currentNode = this.head;
    while (currentNode.next !== null) {
      if (currentNode.next.exp === 0) {
        str += ` ${currentNode.next.coeff}`;
      } else {
        str += ` ${currentNode.next.coeff}X^${currentNode.next.exp} +`;
      }
      currentNode = currentNode.next;
    }
    if (str[str.length - 1] === '+') {
      str = str.substring(0, str.length -1);
    }
    console.log(str);
  }

  reverse() {
    let currentHead = this.head.next,
      previous = null, 
      next = null;
    while (currentHead !== null) {
      next = currentHead.next;
      currentHead.next = previous;
      previous = currentHead;
      currentHead = next;
    }
    this.head.next = previous;
  }
}

function addPolynomiaList(polynomialListA, polynomialListB) {
  let currentNodeA = polynomialListA.head;
  let currentNodeB = polynomialListB.head;
  const polynomialListC = new PolynomialList('add result');
  let index = 0;
  let toInsertedItem;
  while(currentNodeA.next !== null) {
    if (currentNodeB.next === null) {
      toInsertedItem = currentNodeA.next.copy();
      polynomialListC.insert(toInsertedItem, index++);
      currentNodeA = currentNodeA.next;
      break;
    }
    if (currentNodeA.next.exp > currentNodeB.next.exp) {
      toInsertedItem = currentNodeA.next.copy();
      polynomialListC.insert(toInsertedItem, index++);
      currentNodeA = currentNodeA.next;
    } else if (currentNodeA.next.exp === currentNodeB.next.exp) {
      toInsertedItem = currentNodeA.next.combineCopy(currentNodeB.next);
      polynomialListC.insert(toInsertedItem, index++);
      currentNodeA = currentNodeA.next;
      currentNodeB = currentNodeB.next;
    } else {
      toInsertedItem = currentNodeB.next.copy();
      polynomialListC.insert(toInsertedItem, index++);
      currentNodeB = currentNodeB.next;
    }
  }

  while(currentNodeB.next !== null) {
    toInsertedItem = currentNodeB.next.copy();
    polynomialListC.insert(toInsertedItem, index++);
    currentNodeB.currentNodeB.next;
  }

  return polynomialListC;
}

function multiplePolynpmiaList(polynomialListA, polynomialListB) {
  let currentNodeA = polynomialListA.head;
  let currentNodeB = polynomialListB.head;
  const polynomialListC = new PolynomialList('multiple result');
  let index = 0;
  let toInsertedItem;
  const maxExp = currentNodeA.next.exp + currentNodeB.next.exp;
  polynomialListB.reverse();
  let coeff = 0;
  for (let i = maxExp; i >= 0; i--) {
    currentNodeA = polynomialListA.head.next;
    currentNodeB = polynomialListB.head.next;
    while(currentNodeA !== null && currentNodeA.exp > i) {
      currentNodeA = currentNodeA.next;
    }
    while(currentNodeA !== null && currentNodeB !== null
      && currentNodeA.exp + currentNodeB.exp < i) {
        currentNodeB = currentNodeB.next;
      }
    while(currentNodeA !== null && currentNodeB !== null) {
      if (currentNodeA.exp + currentNodeB.exp === i) {
        coeff += currentNodeA.coeff * currentNodeB.coeff;
        currentNodeA = currentNodeA.next;
        currentNodeB = currentNodeB.next;
      } else if (currentNodeA.exp + currentNodeB < i) {
        currentNodeB = currentNodeB.next;
      } else {
        currentNodeA = currentNodeA.next;
      }
    }
    if (coeff !== 0) {
      polynomialListC.insert(new PNode(coeff, i), index++);
      coeff = 0;
    }
  }
  polynomialListB.reverse();
  return polynomialListC;
}

const a = new PolynomialList('a');
const b = new PolynomialList('b');
a.insert(new PNode(2, 3), 0);
a.insert(new PNode(4, 0), 1);
a.display();

b.insert(new PNode(4, 4), 0);
b.insert(new PNode(2, 3), 1);
b.display();

addPolynomiaList(a, b).display();
multiplePolynpmiaList(a, b).display();
