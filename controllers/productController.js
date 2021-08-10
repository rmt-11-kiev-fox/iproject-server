const { Product, Auction } = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

class ProductController {
  static async createProduct(req, res, next) {
    const { dueDate, bin, bid, ob, image, name, category } = req.body;
    let obj = {
      dueDate,
      bin,
      bid,
      currentBid: ob,
      ob,
      image,
      name,
      category,
      status: true,
      UserId: req.currentUser.id,
    };
    try {
      const createdProduct = await Product.create(obj);
      res.status(201).json(createdProduct);
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map((item) => {
          return item.message;
        });
        next({
          name: "Create Product Failed",
          status: 400,
          message: errors,
        });
      } else {
        console.log(err);
        next({
          name: "Create Product Error",
          status: 500,
          message: "Internal Server Error",
        });
      }
    }
  }

  static async getProduct(req, res, next) {
    try {
      const getData = await Product.findAll({
        where: {
          UserId: req.currentUser.id,
        },
      });
      res.status(200).json(getData);
    } catch (error) {
      next({
        name: "Get Product Failed",
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async deleteProduct(req, res, next) {
    const { id } = req.params;

    try {
      const foundData = await Product.destroy({
        where: {
          id,
        },
        returning: true,
      });

      if (foundData) {
        res.status(200).json({ message: "Product success to delete" });
      } else {
        next({
          name: "Delete Product Failed",
          status: 404,
          message: "Product not found",
        });
      }
    } catch (err) {
      next({
        name: "Delete Product Failed",
        status: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async updateProduct(req, res, next) {
    const { dueDate, bin, bid, ob, image, name, category } = req.body;
    let obj = {
      dueDate,
      bin,
      bid,
      ob,
      image,
      name,
      category,
      UserId: req.currentUser.id,
    };

    try {
      const returningUpdate = await Product.update(obj, {
        where: {
          id: Number(req.params.id),
        },
        returning: true,
      });

      if (returningUpdate[0]) {
        res.status(200).json(returningUpdate[1][0]);
      } else {
        next({
          name: "Update Product Failed",
          status: 404,
          message: "Product not found",
        });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map((item) => {
          return item.message;
        });
        next({
          name: "Update Product Failed",
          status: 400,
          message: errors,
        });
      } else {
        next({
          name: "Update Product Failed",
          status: 500,
          message: "Internal Server Error",
        });
      }
    }
  }

  static async changeStatusProduct(req, res, next) {
    const { status } = req.body;
    let obj = {
      status,
    };

    try {
      const findWinner = await Auction.findAll({
        where: {
          ProductId: Number(req.params.id),
        },
        order: [["price", "DESC"]],
        limit: 1,
      });

      let obj = {
        status,
        winner: findWinner[0].username,
      };

      const returningUpdate = await Product.update(obj, {
        where: {
          id: Number(req.params.id),
        },
        returning: true,
      });

      if (returningUpdate[0]) {
        res.status(200).json(returningUpdate[1][0]);
      } else {
        next({
          name: "Update Product Failed",
          status: 404,
          message: "Product not found",
        });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map((item) => {
          return item.message;
        });
        next({
          name: "Update Product Failed",
          status: 400,
          message: errors,
        });
      } else {
        next({
          name: "Update Product Failed",
          status: 500,
          message: "Internal Server Error",
        });
      }
    }
  }

  static async getOneProduct(req, res, next) {
    try {
      const getOneData = await Product.findOne({
        where: {
          id: Number(req.params.id),
        },
      });

      if (getOneData) {
        res.status(200).json(getOneData);
      } else {
        next({
          name: "Get One Product Failed",
          status: 404,
          message: "Data Not Found",
        });
      }
    } catch (error) {
      next({
        name: "Get One Product Failed",
        status: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async getAllProduct(req, res, next) {
    try {
      const getData = await Product.findAndCountAll({
        limit: Number(req.query.size),
        offset: Number(req.query.page) * Number(req.query.size),
      });
      res.status(200).json({ count: getData.count, cards: getData.rows });
    } catch (error) {
      next({
        name: "Get Product Failed",
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async getAllFilteredProduct(req, res, next) {
    try {
      console.log(req.query);
      let params = {};
      if (req.query.text) {
        params.name = {
          [Op.like]: req.query.text,
        };
      }

      if (req.query.status !== "all") {
        params.status = req.query.status === "going";
      }

      if (req.query.category !== "all") {
        params.category = req.query.category;
      }

      const getData = await Product.findAndCountAll({
        limit: Number(req.query.size),
        offset: Number(req.query.page) * Number(req.query.size),
        where: params,
      });
      res.status(200).json({ count: getData.count, cards: getData.rows });
    } catch (error) {
      console.log(error);
      next({
        name: "Get Product Failed",
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = ProductController;
