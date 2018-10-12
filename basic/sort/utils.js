// 生成随机数组函数
exports.generateRandomArray = function generateRandomArray(length) {
  const outputArr = [];
  for(let index = 0; index < length; index ++) {
    const randomNum = +(Math.random() * 1000).toFixed(0);
    outputArr.push(randomNum);
  }
  return outputArr;
};

exports.maxOfArray = function maxOfArray(array) {
  return Math.max.apply(null, array);
};

exports.minOfArray = function minOfArray(array) {
  return Math.min.apply(null, array);
};