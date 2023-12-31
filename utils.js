"use strict"

const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  const values = strNums.split(',');

  const nums = values.map(num =>{
    if (isNaN(Number(num))) {
      throw new BadRequestError(`Argument ${num} is not a number!`);
    }
    return Number(num);
  });

  return nums;
}


module.exports = { convertStrNums };