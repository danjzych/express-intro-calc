const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
try {
  const nums = strNums.split(',').map(num =>Number(num));
  return nums;
} catch (error) {
  throw new BadRequestError();
}

}


module.exports = { convertStrNums };