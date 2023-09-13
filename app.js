"use strict"
/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const {findMean,findMedian,findMode} = require("./stats");
const {convertStrNums} = require("./utils");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get('/mean', function(req, res) {
  if (!req.query.nums) {
    throw new BadRequestError(MISSING)
  }

  const nums = convertStrNums(req.query.nums);

  return res.json({response: {
    operation: "mean",
    value: findMean(nums)
  }});
})

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get('/median', function(req, res) {
  if (!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  const nums = convertStrNums(req.query.nums);

  return res.json({response: {
    operation: "median",
    value: findMedian(nums)
  }})

})


/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get('/mode', function(req, res) {
  if (!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  const nums = convertStrNums(req.query.nums);

  return res.json({response: {
    operation: "mode",
    value: findMode(nums)
  }})
})



/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;