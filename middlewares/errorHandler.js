module.exports = function errorHandler(err, req, res, next) {
  // console.log(err.name, "<<<< err handler");
  // console.log(err.message, "<<<< err message");
  switch (err.name) {
    case "SequelizeValidationError":
      const errors = [];
      err.errors.forEach((e) => {
        errors.push(e.message);
      });
      res.status(400).json({ message: errors });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "authentication failed !" });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.message });
      break;
    case "myError":
      res.status(err.status).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: "internal server error" });
  }
};
