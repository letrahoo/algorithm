class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node('head');
  }

  isEmpty() {
    return this.head.next === null;
  }

  find(item) {
    let currentNode = this.head.next;
    let index = 0;
    while(currentNode !== null) {
      if (currentNode.element === item) {
        return index;
      } else {
        currentNode = currentNode.next;
        index ++;
      }
    }
    return -1;
  }

  insert(newElement, position) {
    if (position < 0) {
      return false
    }
    const newNode = new Node(newElement);
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

  remove(item) {
    let currentNode = this.head;
    while(currentNode.next !== null) {
      if (currentNode.next.element === item) {
        let removeNode = currentNode.next;
        currentNode.next = currentNode.next.next;
        delete removeNode.next;
        delete this.remove.element;
        return true;
      } else {
        currentNode = currentNode.next;
      }
    }
    return false;
  }

  findPrevious(item) {
    let currentNode = this.head;
    while(currentNode.next !== null) {
      if (currentNode.next.element === item) {
        return currentNode;
      } else {
        currentNode = currentNode.next;
      }
    }
    return null;
  }

  makeEmpty() {
    if (this.head.next !== null) {
      let currentNode = this.head.next;
      let p;
      while (currentNode !== null) {
        p = currentNode;
        currentNode = currentNode.next;
        delete p.element;
        delete p.next;
      }
      this.head.next = null;
      return this;
    } else {
      return this;
    }
  }

  display() {
    let currentNode = this.head;
    let str = '';
    while (currentNode.next !== null) {
      str += `${currentNode.next.element} -> `;
      currentNode = currentNode.next;
    }
    str += 'NULL';
    console.log(str);
  }
}

const ll = new LinkedList();
console.log(ll.isEmpty());
ll.insert('hello', 0);
ll.display();

ll.remove('123');
console.log(ll.isEmpty());
ll.display();
ll.insert('chrome', 1);
ll.display();
console.log(ll.findPrevious('chrome'))
ll.remove('hello');
console.log(ll.isEmpty());
ll.display();
