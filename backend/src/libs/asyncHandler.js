/**
  asyncHandler.js
  Utility wrapper for async Express handlers so thrown promise errors reach the central error middleware cleanly.
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
