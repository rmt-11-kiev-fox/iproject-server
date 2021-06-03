const express = require("express");
const router = express();
const Controller = require("../controllers/watchWishlist");
const { wishListAuthorization } = require("../middlewares/authorization");

router.get("/watchWishlist", Controller.ShowAllWishlist);
router.post("/watchWishlist", Controller.addWishlist);
router.use("/watchWishlist/:wishlistId", wishListAuthorization);
router.get("/watchWishlist/:wishlistId", Controller.ShowAOneWishlist);
router.patch("/watchWishlist/:wishlistId", Controller.moveWishlistCategory);
router.delete("/watchWishlist/:wishlistId", Controller.deleteWatchWishlist);

module.exports = router;
