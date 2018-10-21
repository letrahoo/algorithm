class TreeNode {
  constructor(degree) {
    this.degree = degree;
    this.children = [];
    this.keys = [];
    this.isLeaf = false;
    // this.parent = null;
  }

  find(data) {
    let i = 0;
    while (i < this.keys.length && data > this.keys[i]) {
      i++;
    }
    if (i < this.keys.length && data === this.keys[i]) {
      return {
        node: this,
        index: i,
      };
    } else if (this.isLeaf) {
      return null;
    } else {
      return this.children[i].find(data);
    }
  }

  split(index) {
    let fullChild = this.children[index];
    const newNode = new TreeNode(this.degree);
    newNode.isLeaf = fullChild.isLeaf;
    newNode.keys = fullChild.keys.slice(this.degree);
    if (!fullChild.isLeaf) {
      newNode.children = fullChild.children.slice(this.degree);
    }
    this.children.splice(index + 1, 0, newNode);
    this.keys.splice(index, 0, fullChild.keys[this.degree - 1]);
    fullChild.keys.splice(this.degree - 1);
    fullChild.children.splice(this.degree - 1);
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
      if (this.children[i].keys.length === this.degree * 2 - 1) {
        this.split(i);
        if (data > this.keys[i]) {
          i += 1;
        }
      }
      this.children[i].nonFullInsert(data);
    }
  }
}

class BTree {
  constructor(name, degree) {
    this.name = name;
    this.degree = degree;
    const root = new TreeNode(degree);
    root.isLeaf = true;
    this.root = root;
  }

  find(data) {
    if (this.root.keys[0] === data) {
      return {
        node: this.root,
        index: 0,
      };
    } else {
      if (this.root.isLeaf) {
        return null;
      } else {
        return this.root.find(data);
      }
    }
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

  delete(data) {
    
  }
}

const btr = new BTree('btr', 2);
btr.insert('C');
btr.insert('N');
btr.insert('G');
btr.insert('A');
btr.insert('H');
btr.insert('Z');
btr.insert('B');
btr.insert('X');
btr.insert('Y');
btr.insert('P');

console.log(btr);

// console.log(btr.find(8));