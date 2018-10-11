function maxSubSum(inputNumber) {
  const len = inputNumber.length;
  let left = 0,
    right = len - 1,
    mid = parseInt(len / 2 - 1);
  let leftPoint = mid,
    rightPoint = mid + 1;
  if (left === right) {
    if (inputNumber[left] >= 0) {
      return inputNumber[left];
    } else {
      return 0;
    }
  }
  let leftAcross = inputNumber[mid],
    rightAcross = inputNumber[mid + 1];
  let leftAcrossMax = leftAcross,
    rightAcrossMax = rightAcross;
  while((leftPoint--) >= 0) {
    leftAcross += inputNumber[leftPoint];
    if (leftAcross > leftAcrossMax) {
      leftAcrossMax = leftAcross;
    }
  }
  while((rightPoint++) < len) {
    rightAcross += inputNumber[rightPoint];
    if (rightAcross > rightAcrossMax) {
      rightAcrossMax = rightAcross;
    }
  }
  const maxMid = rightAcrossMax + leftAcrossMax;
  const maxLeft = maxSubSum(inputNumber.slice(0, mid + 1));
  const maxRight = maxSubSum(inputNumber.slice(mid + 1));
  console.log(maxMid, maxRight, maxLeft);
  return Math.max(maxMid, maxRight, maxLeft);
}

const array = [4, -3, 5, -2, -1, 2, 6, -1];
console.log(maxSubSum(array));

function bestMaxSubStr(inputArr) {
  let thisSum = 0,
    maxSum = 0;
  for (let i = 0; i < inputArr.length; i++) {
    thisSum += inputArr[i];
    if (thisSum > maxSum) {
      maxSum = thisSum;
    } else if (thisSum < 0) {
      thisSum = 0;
    }
  }
  return maxSum;
}
console.log(bestMaxSubStr(array));