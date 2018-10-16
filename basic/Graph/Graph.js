class Vertex {
  constructor(id) {
    this.id = id;
    this.data = null;
  }

  setData(data) {
    this.data = data;
  }
}

class Edge {
  constructor() {
    this.u = null;
    this.v = null;
    this.w = null;
  }
}

class Graph {
  constructor() {
    this.vertices = [];
    this.edges = [];
    this.refer = new Map();
  }

  initVertices(vertices) {
    if (Object.prototype.toString.call(vertices) === '[object Array]') {
      for (let id of vertices) {
        const vertex = new Vertex(id);
        this.refer.set(id, vertex);
        this.vertices.push(vertex);
      }
    } else if (Object.prototype.toString.call(vertices) === '[object Object]') {
      for (let key in vertices) {
        const vertex = new Vertex(key);
        vertex.setData(vertices[key]);
        this.refer.set(key, vertex);
        this.vertices.push(vertex);
      }
    } else {
      throw Error('The vertices are not legal.');
    }
  }

  initEdges(edges) {
    for (let item of edges) {
      let edge = new Edge();
      edge.u = this.refer.get(item.u);
      edge.v = this.refer.get(item.v);
      edge.w = item.w;
      this.edges.push(edge);
    }
  }

  addVertex(id) {
    const vertex = new Vertex(id);
    this.refer.set(id, vertex);
    this.vertices.push(vertex);
  }

  addEdge({u, v, w}) {
    let edge = new Edge();
    edge.u = this.refer.get(u);
    edge.v = this.refer.get(v);
    edge.w = w;
    this.edges.push(edge);
  }

  removeVertex(id) {
    for(let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i].id === id) {
        for (let j = 0; j < this.edges.length; j++) {
          if (this.edges[j].u.id === id || this.edges[j].v.id === id) {
            this.edges.splice(j, 1);
          }
        }
        this.vertices.splice(i, 1);
        this.refer.delete(id);
      }
    }
    return false;
  }

  removeEdge({u, v}) {
    const vertexFrom = this.refer.get(u);
    const vertexTo = this.refer.get(v);
    for (let i = 0; i < this.edges.length; i++) {
      if (this.edges[i].u === vertexFrom &&
        this.edges[i].v === vertexTo) {
          this.edges.splice(i, 1);
          return true;
        }
    }
    return false;
  }
}

const vertices = {
  s: 0,
  t: 1,
  x: 2,
  y: 3,
  z: 4,
};
const edges = [
    {u: 's', v: 't', w: 6},
    {u: 's', v: 'y', w: 7},
    {u: 't', v: 'x', w: 5},
    {u: 't', v: 'y', w: 8},
    {u: 't', v: 'z', w: -4},
    {u: 'x', v: 't', w: -2},
    {u: 'y', v: 'x', w: -3},
    {u: 'y', v: 'z', w: 9},
    {u: 'z', v: 's', w: 2},
    {u: 'z', v: 'x', w: 7},
];
const graph = new Graph();
graph.initVertices(vertices);
graph.initEdges(edges);
graph.addVertex('a');
graph.addEdge({v: 'a', u: 's', w: 123})
graph.removeVertex('a');
graph.removeEdge({u: 'z', v: 's'});
console.log(graph);