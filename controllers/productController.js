const { Product } = require("../models");
const axios = require("axios");

class productController {
  static async getAll(req, res, next) {
    // console.log(req.query, "<<<query");
    try {
      if (req.query.product_type) {
        // console.log(req.query.product_type, "<<<dlm if query");
        let { data } = await axios({
          method: "GET",
          url: `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${req.query.product_type}`,
        });
        res.status(200).json(data);
      } else if (req.query.brand) {
        // console.log(req.query.brand, "<<<dlm if query");
        let { data } = await axios({
          method: "GET",
          // http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline
          url: `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${req.query.brand}`,
        });
        res.status(200).json(data);
      } else if (req.query.product_category) {
        // console.log(req.query.product_category, "<<<dlm if query");
        let { data } = await axios({
          method: "GET",
          // https://makeup-api.herokuapp.com/api/v1/products?product_category=cream
          url: `http://makeup-api.herokuapp.com/api/v1/products.json?product_category=${req.query.product_category}`,
        });
        res.status(200).json(data);
      } else if (req.query.product_tags) {
        // console.log(req.query.product_tags, "<<tags dalm query<<<<");

        let { data } = await axios({
          method: "GET",
          // http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=Hypoallergenic
          url: `http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=${req.query.product_tags}`,
        });
        res.status(200).json(data);
      } else {
        const { data } = await axios({
          method: "GET",
          url: "http://makeup-api.herokuapp.com/api/v1/products.json",
        });
        // res.status(200).json(data)
        res.status(200).json(data);
      }
      //   console.log(data, "<<controller");
    } catch (err) {
      console.log(err, "<<<err");
      next(err);
    }
  }

  static async addProduct(req, res, next) {
    console.log(req.user, "<<di controller");
    // console.log(req.body.product_id, "<<body di add");
    // console.log(req.body, "<<body");
    // console.log(req.body.colors, "<<<colors");
    let id = req.user.id;
    let { brand, name, description, category, product_type, product_tag } =
      req.body;

    let data = {
      brand,
      name,
      description,
      category,
      product_type,
      product_tag,
      UserId: id,
    };
    try {
      let myProduct = await Product.create(data);
      res.status(201).json(myProduct);
    } catch (err) {
      console.log(err, "<<<err");
      next(err);
    }
  }
}

module.exports = productController;
