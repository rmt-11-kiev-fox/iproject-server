const { Product } = require("../models");

class productController {
  static async getAll(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "http://makeup-api.herokuapp.com/api/v1/products.json",
      });
      //   console.log(data, "<<controller");
      res.status(200).json(data);
    } catch (err) {
      console.log(err, "<<<err");
      next(err);
    }
  }

  static async getByCategory(req, res, next) {
    // console.log(req.params, "<<paramss");
    let category = req.params.product_category;
    // try {
    //   const { data } = await axios({
    //     method: "GET",
    //     url: `http://makeup-api.herokuapp.com/api/v1/product.json?product_category=${category}`,
    //   });
    //   console.log(data, "<<controller");
    //   res.status(200).json(data);
    // } catch (err) {
    //   console.log(err, "<<<err");
    //   next(err);
    // }
  }

  static async getByBrand(req, res, next) {
    console.log(req.params, "<<params brand");
  }

  static async getByType(req, res, next) {
    console.log(req.params, "<<params type");
    // let type = req.params;
    // try {
    //   const { data } = await axios({
    //     method: "GET",
    //     url: `http://makeup-api.herokuapp.com/api/v1/product.json?product_category=${type}`,
    //   });
    //   console.log(data, "type<<<<");
    //   res.status(200).json(data);
    // } catch (err) {
    //   next(err);
    // }
  }

  static async getByTag(req, res, next) {}

  static async addProduct(req, res, next) {
    console.log(req.user, "<<di controller");
  }
}

module.exports = productController;
