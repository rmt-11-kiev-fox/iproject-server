const { Product } = require("../models");

async function authorization(req, res, next) {
  console.log(req.params.id, "id author<<<<");
  const foundProd = await Product.findByPk(req.params.id);
  try {
    if (foundProd) {
      console.log(foundProd, "<<prod author");
      if (foundProd.UserId === req.user.id) {
        next();
      } else {
        throw {
          name: "myError",
          status: 401,
          message: "youre not authorized!",
        };
      }
    } else {
      throw { name: "myError", status: 404, message: "data not found" };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authorization;
