const { Product, User } = require("../models");
const sendEmail = require("../helpers/nodemailer");
const axios = require("axios");

// sudo kill -9 $(sudo lsof -t -i:3000)
class productController {
  static async getAll(req, res, next) {
    try {
      if (req.query.product_type) {
        let { data } = await axios({
          method: "GET",
          url: `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${req.query.product_type}`,
        });
        res.status(200).json(data);
      } else if (req.query.brand) {
        let { data } = await axios({
          method: "GET",

          url: `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${req.query.brand}`,
        });
        res.status(200).json(data);
      } else if (req.query.product_category) {
        let { data } = await axios({
          method: "GET",

          url: `http://makeup-api.herokuapp.com/api/v1/products.json?product_category=${req.query.product_category}`,
        });
        res.status(200).json(data);
      } else if (req.query.product_tags) {
        let { data } = await axios({
          method: "GET",

          url: `http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=${req.query.product_tags}`,
        });
        res.status(200).json(data);
      } else {
        const { data } = await axios({
          method: "GET",
          url: "http://makeup-api.herokuapp.com/api/v1/products.json",
        });

        res.status(200).json(data);
      }
    } catch (err) {
      console.log(err, "<<<err");
      next(err);
    }
  }

  static async addProduct(req, res, next) {
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

  static async getAllRec(req, res, next) {
    let id = req.user.id;
    try {
      let recProduct = await Product.findAll({ where: { UserId: id } });

      if (recProduct) {
        res.status(200).json(recProduct);
      } else {
        throw {
          name: "myError",
          status: 404,
          message: "you haven't add anything to your list",
        };
      }
    } catch (err) {
      console.log(err, "<<err");
      next(err);
    }
  }

  static async delete(req, res, next) {
    console.log(req.user, "<<<user id");
    console.log(req.params, "<<<params");
    let id = +req.params.id;
    try {
      let delData = await Product.destroy({ where: { id } });
      if (delData) {
        res.status(200).json({ message: "data successfully deleted" });
      } else {
        throw {
          name: "myError",
          status: 404,
          message: "data not found",
        };
      }
    } catch (err) {
      console.log(err, "<<err");
      next(err);
    }
  }

  static async sendList(req, res, next) {
    // console.log(req.user);
    let id = +req.user.id;

    try {
      // let productList = [];

      let userEmail = "";
      //===getAll list===
      let findList = await Product.findAll({ where: { UserId: id } });
      //===cek user, ambil data email===
      let findUser = await User.findByPk(id);
      if (!findUser) {
        throw {
          name: "myError",
          status: 404,
          message: "unregistered user",
        };
      } else {
        userEmail = findUser.email;
      }

      if (!findList) {
        throw {
          name: "myError",
          status: 404,
          message: "you have nothing on your list",
        };
      }

      // let text = `You have some reccomendation to try ${productList}`;
      let data;
      for (let i = 0; i < findList.length; i++) {
        data = findList[i];
      }
      // let data = findList;
      sendEmail(userEmail, data);
      res.status(200).json({ message: "email already sent to user !" });
    } catch (err) {
      console.log(err, "<<err");
      next(err);
    }
  }
}

module.exports = productController;
