const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const msg = err || "Internal Server Error";
  res.status(statusCode).json({ errors: msg });
};

module.exports = errorHandler;
