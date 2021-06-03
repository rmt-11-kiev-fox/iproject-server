const { Product } = require("../models");

const authorizationProduct = async (req, res, next) => {
  try {
    const getProduct = await Product.findOne({
      where: {
        id: Number(req.params.id),
      },
    });
    if (getProduct) {
      if (getProduct.UserId === req.currentUser.id) {
        next();
      } else {
        throw { status: 403, message: "You'r not authorized" };
      }
    } else {
      throw { status: 404, message: "Data Not Found" };
    }
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "internal server error";
    res.status(status).json({ message });
  }
};

module.exports = { authorizationProduct };
