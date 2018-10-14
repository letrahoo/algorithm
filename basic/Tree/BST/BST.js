class BST {
  constructor(name) {
    this.name = name;
    this.root = null;
  }

  makeEmpty() {
    if (this.root !== null) {
      this.root.clear();
    }
  }

  // 查找非递归实现
  find(data) {
    if (this.root !== null) {
      let current = this.root;
      while (true) {
        if (current.element > data) {
          current = current.left;
          if (current === null) {
            return -1;
          }
        } else if (current.element < data) {
          current = current.right;
          if (current === null) {
            return -1;
          }
        } else {
          return current;
        }
      }
    } else {
      throw Error('The tree has not node.');
    }
  }

  // 查找递归实现
  // find(data) {
  //   if (this.root === null) {
  //     throw Error('The tree has not node.');
  //   }
  //   return this.root.find(data);
  // }

  // 查找最小值
  findMin() {
    let current = this.root;
    if (this.root !== null) {
      while(true) {
        if (current.left !== null) {
          current = current.left;
        } else {
          return current.element;
        }
      }
    } else {
      throw Error('The tree has not node.');
    }
  }

  // 查找最大值
  findMax() {
    let current = this.root;
    if (this.root !== null) {
      while(true) {
        if (current.right !== null) {
          current = current.right;
        } else {
          return current.element;
        }
      }
    } else {
      throw Error('The tree has not node.');
    }
  }

  // 插入
  insert(data) {
    let newNode = new TreeNode(data);
    if (this.root === null) {
      this.root = newNode;
      return true;
    }
    let current = this.root;
    while (true) {
      if (current.element > data) {
        if (current.left === null) {
          current.left = newNode;
          return true;
        } else {
          current = current.left;
        }
      } else if (current.element < data) {
        if (current.right === null) {
          current.right = newNode;
          return true;
        } else {
          current = current.right;
        }
      } else {
        return false;
      }
    }
  }

  // 删除
  delete(data) {
    let findResult = this.find(data);
    if (findResult === -1) {
      throw Error(`There's no data of ${data} in the tree`);
    } else {
      findResult.delete();
      return true;
    }
  }

  // 打印
  display() {
    if (this.root !== null) {
      let str = `${this.name}树结构为: ${this.root.display()}`
      console.log(str);
    } else {
      throw Error('The tree has not node.');
    }
  }
}

class TreeNode {
  constructor(element) {
    this.element = element;
    this.right = null;
    this.left = null;
  }

  clear() {
    if (this.left !== null) {
      this.left.clear();
      this.left = null;
    }
    if (this.right !== null) {
      this.right.clear();
      this.right = null;
    }
    delete this.element;
  }

  // 查找递归实现
  find(data) {
    if (this.element > data) {
      if (this.left) {
        return this.left.find(data);
      } else {
        return -1;
      }
    } else if (this.element < data) {
      if( this.right) {
        return this.right.find(data);
      } else {
        return -1;
      }
    } else {
      return this;
    }
  }

  delete() {
    let current, parent;
    // TODO
  }

  display() {
    let str = `值: ${this.element}`;
    if (this.left !== null) {
      str += `左子树: {${this.left.display()}}`;
    } else {
      str += '左子树: null';
    }
    if (this.right !== null) {
      str += `右子树: {${this.right.display()}}`;
    } else {
      str += '右子树: null';
    }
    return str;
  }
}

let at = new BST('at');
at.insert(8);
at.insert(4);
at.insert(12);
console.log(at.find(8).find(4));

at.display();