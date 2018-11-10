const generateRandomArray = require("./utils").generateRandomArray;

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    const left = arr.slice(0, arr.length / 2);
    const right = arr.slice(arr.length / 2);
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);
    return merge(sortedLeft, sortedRight);
  }
}

function merge(sortedLeft, sortedRight) {
  const res = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (
    leftIndex <= sortedLeft.length - 1 ||
    rightIndex <= sortedRight.length - 1
  ) {
    if (sortedLeft[leftIndex]) {
      if (sortedRight[rightIndex]) {
        if (sortedLeft[leftIndex] < sortedRight[rightIndex]) {
          res.push(sortedLeft[leftIndex]);
          leftIndex++;
        } else {
          res.push(sortedRight[rightIndex]);
          rightIndex++;
        }
      } else {
        res.push(sortedLeft[leftIndex]);
        leftIndex++;
      }
    } else {
      res.push(sortedRight[rightIndex]);
      rightIndex++;
    }
  }
  return res;
}

const arr = generateRandomArray(10);
console.log(arr);
console.log(mergeSort(arr));
