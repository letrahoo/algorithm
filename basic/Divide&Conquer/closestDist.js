class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function generateRandomPoint(num) {
  const res = [];
  for (let i = 0; i < num; i++) {
    const x = Math.random() * 50 - 25;
    const y = Math.random() * 50 - 25;
    const newPoint = new Point(parseInt(x), parseInt(y));
    res.push(newPoint);
  }
  return res;
}

function compareX(A, B) {
  return A.x - B.x;
}

function compareY(A, B) {
  return A.y - B.y;
}

function dist(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function stripClosest(strip, d) {
  let min = d;
  let a, b;
  strip.sort(compareY);
  for (let i = 0; i < strip.length; ++i) {
    for (
      let j = i + 1;
      j < strip.length && strip[j].y - strip[i].y < min;
      ++j
    ) {
      if (dist(strip[i], strip[j]) < min) {
        min = dist(strip[i], strip[j]);
        a = strip[i];
        b = strip[j];
      }
    }
  }
  return { min, points: { a, b } };
  // for (let i = 1; i < strip.length; i++) {
  //   if (strip[i - 1] && dist(strip[i], strip[i - 1]) < min) {
  //     min = dist(strip[i], strip[i - 1]);
  //     a = strip[i];
  //     b = strip[i - 1];
  //   }
  //   if (strip[i - 2] && dist(strip[i], strip[i - 2]) < min) {
  //     min = dist(strip[i], strip[i - 2]);
  //     a = strip[i];
  //     b = strip[i - 2];
  //   }
  //   if (strip[i - 3] && dist(strip[i], strip[i - 3]) < min) {
  //     min = dist(strip[i], strip[i - 3]);
  //     a = strip[i];
  //     b = strip[i - 3];
  //   }
  //   return { min, points: { a, b } };
  // }
}

function closetDist(P) {
  const points = [...P];
  points.sort(compareX);
  if (P.length <= 3) {
    return bruteForce(P);
  }
  const len = points.length;
  const mid = parseInt(len / 2);

  const midPoint = points[mid];
  const leftPoints = points.slice(0, mid);
  const rightPoints = points.slice(mid + 1);

  const dl = closetDist(leftPoints);
  const dr = closetDist(rightPoints);
  const d = dl.min > dr.min ? dr : dl;

  const strip = [];
  for (let i = 0; i < len; i++) {
    if (Math.abs(points[i].x - midPoint.x) < d.min) {
      strip.push(points[i]);
    }
  }

  const stripRes = stripClosest(strip, d.min);
  return stripRes && stripRes.min < d.min ? stripRes : d;
}

function bruteForce(P) {
  let min = 10000;
  let a, b;
  const len = P.length;
  for (let i = 0; i < len; ++i) {
    for (let j = i + 1; j < len; ++j) {
      if (dist(P[i], P[j]) < min) {
        min = dist(P[i], P[j]);
        a = P[i];
        b = P[j];
      }
    }
  }
  return { min, points: { a, b } };
}

const points = generateRandomPoint(10);
console.log(points);
console.log(bruteForce(points));
console.log(closetDist(points));
