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
exports.msd = function radixSort(array) {
  const max = maxOfArray(array),
    times = getLoopTimes(max);
  const output = array.slice(0);
  // 应用 MSD 基数排序
  msdRadixSort(output, times);
  return output;
}

// MSD 基数排序，Most significant digi，从高位到低位
function msdRadixSort(array, radix) {
  const len = array.length;
  const buckets = [];
  let currentRadix = radix;
  // 生成桶
  for (let i = 0; i < 10; i++) {
    buckets[i] = [];
  }

  //入桶
  for (let i = 0; i < len; i++) {
    let el = array[i];
    let index = getBucketNumer(el, radix);
    buckets[index].push(el);
  }

  //递归子桶
  for (let i = 0; i < 10; i++) {
    let el = buckets[i];
    if (el.length > 1 && currentRadix - 1) {
      msdRadixSort(el, currentRadix - 1);
    }
  }

  let k = 0;
  //重写原桶
  for (let i = 0; i < 10; i++) {
    let bucket = buckets[i];
    for (let j = 0; j < bucket.length; j++) {
      array[k++] = bucket[j];
    }
    bucket.length = 0;
  }
}

// const a = generateRandomArray(10);
// console.log(a);

// console.log(radixSort(a));