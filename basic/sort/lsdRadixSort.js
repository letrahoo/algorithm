const utils = require('./utils');
const generateRandomArray = utils.generateRandomArray;
const maxOfArray = utils.maxOfArray;

// 获取循环次数——这里对应最大数字的位数
function getLoopTimes(num) {
  return String(num).length;
}

// 根据某个数字的某个位数上的值获取桶的编号
function getBucketNumer(num, d) {
  const numString = String(num);
  if (numString.length < d) {
    return 0;
  }
  return numString[numString.length - d];
}

// 排序算法
exports.lsd = function radixSort(array) {
  const max = maxOfArray(array),
    times = getLoopTimes(max);
  const buckets = [],
    output = array.slice(0);
  for (let i = 0; i < 10; i++) {
    buckets[i] = [];
  }

  // 应用 LSD 基数排序
  for (let radix = 1; radix <= times; radix++) {
    lsdRadixSort(output, buckets, radix);
  }

  return output;
}

// LSD基数排序, Least significant digit，从低位到高位
function lsdRadixSort(array, buckets, radix) {
  const len = array.length;
  for (let i = 0; i < len; i++) {
    let el = array[i];
    let index = getBucketNumer(el, radix);
    buckets[index].push(el);
  }
  let k = 0;
  for (let i = 0; i < 10; i++) {
    let bucket = buckets[i];
    // 取出
    for (let j = 0; j < bucket.length; j++) {
        array[k++] = bucket[j];
    }
    // 清空
    bucket.length = 0;
  }
}

// const a = generateRandomArray(10);
// console.log(a);
// console.log(radixSort(a));
// console.log(getBucketNumer(9213, 3))