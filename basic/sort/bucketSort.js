const generateArray = require('./utils').generateRandomArray;

function bucketSort(array, bucketNum) {
  const len = array.length;
  const output = [];
  if(len <= 1) {
    return array;
  }
  const min = Math.min.apply(null, array);
  const max = Math.max.apply(null, array);
  if (max === min) {
    return array;
  }
  const capacity = (max - min + 1) / bucketNum;
  const buckets = Array(max - min + 1);
  // 
  for (let i = 0; i < len; i++) {
    let el = array[i];
    let index = Math.floor((el - min) / capacity);
    let bucket = buckets[index];
    if (bucket) {
      let bucketLenIndex = bucket.length;
      if (el >= bucket[bucketLenIndex - 1]) {
        bucket[bucketLenIndex] = el;
      } else {
        insertSort:
        for(let j = 0; j < len; j++) {
          if (bucket[j] > el) {
            while (bucketLenIndex > j) {
              bucket[bucketLenIndex] = bucket[bucketLenIndex - 1];
              bucketLenIndex--;
            }
            bucket[j] = el;
            break insertSort;
          }
        }
      }
    } else {
      buckets[index] = [el];
    }
  }
  let index = 0;
  for (let i = 0; i < bucketNum; i++) {
    const bucket = buckets[i];
    if (bucket) {
      for (let k = 0, bucketLen = bucket.length; k < bucketLen; k++) {
        output[index++] = bucket[k];
      }
    }
  }
  return output;
}

const array = generateArray(20);
console.log(bucketSort(array, 10));