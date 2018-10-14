class AvlNode {
  constructor(element) {
    this.element = element;
    this.right = null;
    this.left = null;
    this.height = 0;
  }

  // 插入
  insert(data) {
    // 新建要插入的节点
    let newNode = new AvlNode(data);
    // 判断插入值与当前节点的大小
    if (data < this.element) {
      // 左节点为空
      if (this.left === null) {
        // 插入新节点为左节点
        this.left = newNode;
      } else {
        // 左子树递归插入
        this.left.insert(data);
      }
      // 插入后不再平衡
      if (getHeight(this.left) - getHeight(this.right) == 2) {
        // 左左插入
        if(data < this.left.element) {
          // 右单旋
          this.rotateRight();
        } else {
          this.rotateLeftRight();
        }
      }
      this.height = Math.max(getHeight(this.left), getHeight(this.right)) + 1;
      return true;
    } else if (data > this.element) {
      if (this.right === null) {
        this.right = newNode;
      } else {
        this.right.insert(data);
      }
      if (getHeight(this.right) - getHeight(this.left) == 2) {
        if(data > this.right.element) {
          this.rotateLeft();
        } else {
          this.rotateRightLeft();
        }
      }
      this.height = Math.max(getHeight(this.left), getHeight(this.right)) + 1;
      return true;
    } else {
      return false;
    }
  }

  find(data) {

  }

  // 右单旋 —— 左左
  rotateRight() {
    let currentLeft = this.left,
      currentRight = this.right;
    let newNode = new AvlNode(this.element);
    this.element = currentLeft.element;
    this.left = currentLeft.left;
    newNode.left = currentLeft.right;
    newNode.right = currentRight;
    newNode.height = Math.max(getHeight(newNode.left), getHeight(currentRight)) + 1;
    this.right = newNode;
    this.height = Math.max(getHeight(this.left), getHeight(newNode)) + 1;
  }

  // 右单旋 —— 右右
  rotateLeft() {
    let currentLeft = this.left,
      currentRight = this.right;
    let newNode = new AvlNode(this.element);
    this.element = currentRight.element;
    this.right = currentRight.right;
    newNode.right = currentRight.left;
    newNode.left = currentLeft;
    newNode.height = Math.max(getHeight(newNode.right), getHeight(currentLeft)) + 1;
    this.left = newNode;
    this.height = Math.max(getHeight(this.right), getHeight(newNode)) + 1;
  }

  // 左右旋 ——左右
  rotateLeftRight() {
    this.left.rotateLeft();
    this.rotateRight();
  }

  // 右左旋 —— 右左
  rotateRightLeft() {
    this.right.rotateRight();
    this.rotateLeft();
  }
}

function getHeight(node) {
  if (!node) {
    return -1;
  } else {
    return node.height;
  }
}

let a = new AvlNode(3);
a.insert(2);
a.insert(1);
a.insert(4);
a.insert(5);
a.insert(6);
console.log(a);