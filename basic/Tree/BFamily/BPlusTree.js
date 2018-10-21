class BPlusTree {
  constructor(name, degree) {
    this.name = name;
    this.degree = degree;
    const root = new TreeNode(degree);
    root.isLeaf = true;
    this.root = root;
    this.next = null;
  }

  insert(data) {
    const root = this.root;
    if (this.root.keys.length === this.degree * 2 - 1) {
      const newNode = new TreeNode(this.degree);
      this.root = newNode;
      newNode.isLeaf = false;
      newNode.children.push(root);
      newNode.split(0);
      newNode.nonFullInsert(data);
    } else {
      this.root.nonFullInsert(data);
    }
  }
}

class TreeNode {
  constructor(degree) {
    this.isLeaf = false;
    this.degree = degree;
    this.keys = [];
    this.children = [];
  }

  split(index) {
    let fullChild = this.children[index];
    const newNode = new TreeNode(this.degree);
    newNode.isLeaf = fullChild.isLeaf;
    newNode.keys = fullChild.keys.slice(this.degree - 1);
    if (!fullChild.isLeaf) {
      newNode.children = fullChild.children.slice(this.degree);
    } else {
      fullChild.next = newNode; // 叶子结点指向下一个
    }
    this.children.splice(index + 1, 0, newNode);
    this.keys.splice(index, 0, fullChild.keys[this.degree - 1]);
    fullChild.keys.splice(this.degree - 1);
    fullChild.children.splice(this.degree);
  }

  nonFullInsert(data) {
    let i = this.keys.length - 1;
    if (this.isLeaf) {
      while (i >= 0 && data < this.keys[i]) {
        this.keys[i + 1] = this.keys[i];
        i--;
      }
      this.keys[i + 1] = data;
    } else {
      while (i >= 0 && data < this.keys[i]) {
        i--;
      }
      i += 1;
      console.log(this.children, this, i);
      if (this.children[i].keys.length === this.degree * 2 - 1) {
        this.split(i);
        if (data >= this.keys[i]) {
          i += 1;
        }
      }
      this.children[i].nonFullInsert(data);
    }
  }
}

const btr = new BPlusTree('btr', 2);
btr.insert('C');
btr.insert('N');
btr.insert('G');
btr.insert('A');
btr.insert('H');
btr.insert('Z');
btr.insert('B');
btr.insert('X');
btr.insert('Y'); // BUG
btr.insert('P');