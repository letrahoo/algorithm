const utils = require('./utils');
const generateRandomArray = utils.generateRandomArray;
const maxOfArray = utils.maxOfArray;
const minOfArray = utils.minOfArray;
// 仅支持正数
function countSort(array) {
  const max = Math.max.apply(null, array);
  const output = [];
  const buckets = [];
  const len = array.length;
  for (let i = 0; i < len; i++) {
    const el = array[i];
    if (buckets[el]) {
      buckets[el]++;
    } else {
      buckets[el] = 1;
    }
  }
  let index = 0;
  for (let i = 0; i <= max; i++) {
    if (buckets[i]) {
      let num = buckets[i];
      while(num) {
        output[index] = i;
        index++;
        num--;
      }
    }
  }
  return output;
}

// 优化后
function advancedCountSort(array) {
  const output = [];
  const max = maxOfArray(array),
    min = minOfArray(array),
    len = array.length;

  const buckets = Array(max - min + 1).fill(0);
  for (let i = 0; i < len; i++) {
    buckets[array[i] - min]++;
  }
  let index = 0,
    bucketNum = max - min + 1;
  for (let i = 0; i < bucketNum; i++) {
    let num = buckets[i];
    while(num) {
      output[index] = i + min;
      index++
      num--;
    }
  }
  return output
}

const a = generateRandomArray(10);
console.log(a);

console.log(countSort(a));
console.log(advancedCountSort(a));