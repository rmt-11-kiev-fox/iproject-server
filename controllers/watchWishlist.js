const { WatchWishlist } = require("../models");

class Controller {
  static ShowAllWishlist(req, res) {
    let UserId = req.user.id;
    WatchWishlist.findAll({ where: { UserId } })
      .then((data) => {
        // console.log(data);
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
  static ShowAOneWishlist(req, res) {
    let id = req.params.wishlistId;
    WatchWishlist.findOne({
      where: { id },
    })
      .then((data) => {
        console.log(id);
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err, "THIS ERR");
        res.status(500).json(err);
      });
  }
  static addWishlist(req, res) {
    // console.log(req.user.id, "req.user.id addwishlist");
    // console.log(req.body.newWishlist, "req body addWishlist");
    let newWishlist = {
      category: req.body.newWishlist.category,
      type: req.body.newWishlist.type,
      UserId: req.user.id,
      MovieId: req.body.newWishlist.MovieId,
      posterPath: "https://image.tmdb.org/t/p/w500" + req.body.posterPath,
      title: req.body.newWishlist.title,
      releaseDate: req.body.newWishlist.releaseDate,
    };
    WatchWishlist.findOne({
      where: { MovieId: newWishlist.MovieId, UserId: req.user.id },
    })
      .then((data) => {
        if (!data) {
          return WatchWishlist.create(newWishlist);
        } else {
          if (data.category !== newWishlist.category) {
            return WatchWishlist.update(newWishlist, {
              where: {
                UserId: newWishlist.UserId,
                MovieId: newWishlist.MovieId,
              },
              returning: true,
            });
          } else {
            return false;
          }
        }
      })
      .then((data) => {
        if (data == false) {
          // console.log(`movie already added as ${newWishlist.category}`);
          res
            .status(400)
            .json(`movie already added as ${newWishlist.category}`);
        } else {
          if (data.length > 1) {
            // console.log(data[1][0], "updated wish list data");
            res.status(200).json("Wishlist category updated");
          } else {
            // console.log(data, "Succesfully Added To Wishlist");
            res.status(200).json("Succesfully Added To Wishlist");
          }
        }
      })
      .catch((err) => {
        console.log(err, "addWishList ERR");
        res.status(500).json(err);
      });
  }
  static moveWishlistCategory(req, res) {
    console.log("IN watchlist patch");
    let newCateg = { category: req.body.category };
    let UserId = req.user.id;
    let id = req.params.wishlistId;
    WatchWishlist.update(newCateg, { where: { UserId, id }, returning: true })
      .then((data) => {
        res.status(200).json(data[1][0]);
      })
      .catch((err) => {
        console.log(err, "THIS ERR");
        res.status(500).json(err);
      });
  }
  static deleteWatchWishlist(req, res) {
    let id = req.params.wishlistId;
    WatchWishlist.destroy({ where: { id } })
      .then((data) => {
        res
          .status(200)
          .json({ message: "succesfully deleted movie from wishlist" });
      })
      .catch((err) => {
        console.log(err, "THIS ERR");
        res.status(500).json(err);
      });
  }
}

module.exports = Controller;
