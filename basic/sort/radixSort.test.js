const utils = require('./utils');
const msd = require('./msdRadixSort').msd;
const lsd = require('./lsdRadixSort').lsd;
const generateRandomArray = utils.generateRandomArray;

const len = 1000;

const arr = generateRandomArray(len);

const arrMsd = msd(arr);
const arrLsd = lsd(arr);
let flag = true;

for (let i = 0; i < len; i ++) {
  if (arrLsd[i] !== arrMsd[i]) {
    flag = false
  }
}

console.log(flag);