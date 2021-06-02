const { WatchWishlist, Review } = require("../models");

const wishListAuthorization = (req, res, next) => {
  WatchWishlist.findOne({
    where: { id: req.params.wishlistId, UserId: req.user.id },
  })
    .then((data) => {
      if (!data) {
        console.log("not authorized");
        console.log(req.user.id);
        res.status(401).json({ message: "not authorized" });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err, "wishlist authorization error");
    });
};

const reviewAuthorization = (req, res, next) => {
  // console.log(req.user, "requserid authorization");
  Review.findOne({ where: { UserId: req.user.id } })
    .then((data) => {
      // console.log(data, "review autho data");
      if (!data) {
        console.log("not authorized");
        res.status(401).json({ message: "not authorized" });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { wishListAuthorization, reviewAuthorization };
