const routes = require("express").Router();
const { AuctionController } = require("../controllers");
const {
  addAuctionHandler,
  getAuctionHandler,
  addHistoryHandler,
  getHistoryHandler,
} = AuctionController;
const { authentication } = require("../middlewares/authentications");

routes.use(authentication);

routes.post("/auctions", addAuctionHandler);
routes.get("/auctions/:productId", getAuctionHandler);

routes.post("/history", addHistoryHandler);
routes.get("/history", getHistoryHandler);

module.exports = routes;
