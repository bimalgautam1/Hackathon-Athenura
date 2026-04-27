/**
 * notFound.middleware.js
 * Catches undefined routes and returns a 404 JSON response.
 */

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export default notFound;
