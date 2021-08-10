const { Auction, Product, History } = require("../models");

class AuctionController {
  static async addAuctionHandler(req, res, next) {
    try {
      const { ProductId, price } = req.body;

      const findAuction = await Auction.findOne({
        where: {
          ProductId,
          UserId: req.currentUser.id,
        },
      });

      await Product.update(
        { currentBid: price },
        {
          where: { id: ProductId },
        }
      );

      if (findAuction) {
        const updateAuction = await Auction.update(
          { price },
          {
            where: { id: findAuction.id },
            returning: true,
          }
        );

        res.status(200).json(updateAuction[1][0]);
      } else {
        const createdAuction = await Auction.create({
          ProductId,
          UserId: req.currentUser.id,
          price,
          username: req.currentUser.username,
        });

        res.status(201).json(createdAuction);
      }
    } catch (error) {
      console.log(error);
      next({
        name: "Create Auction Failed",
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async getAuctionHandler(req, res, next) {
    try {
      const getData = await Auction.findAll({
        where: {
          ProductId: req.params.productId,
        },
        order: [["price", "DESC"]],
        limit: Number(req.query.size),
      });
      res.status(200).json(getData);
    } catch (error) {
      next({
        name: "Get Auction Failed",
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async addHistoryHandler(req, res, next) {
    try {
      const { sellerId, price, image, name } = req.body;
      const obj = {
        sellerId,
        price,
        image,
        name,
        winnerId: req.currentUser.id,
        winnerName: req.currentUser.username,
      };

      const findHistory = await History.findOne({
        where: {
          winnerId: req.currentUser.id,
        },
      });

      if (!findHistory) {
        const createdHistory = await History.create(obj);
        res
          .status(201)
          .json({ name: createdHistory.name, price: createdHistory.price });
      } else {
        res.status(200).json({ msg: "you have done confirm it" });
      }
    } catch (error) {
      console.log(error);
      next({
        name: "Create History Failed",
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async getHistoryHandler(req, res, next) {
    let getData;
    try {
      const { role } = req.query;
      if (role === "seller") {
        getData = await History.findAll({
          where: {
            sellerId: req.currentUser.id,
          },
        });
      } else {
        getData = await History.findAll({
          where: {
            winnerId: req.currentUser.id,
          },
        });
      }

      res.status(200).json(getData);
    } catch (error) {
      next({
        name: "Get History Failed",
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = AuctionController;
