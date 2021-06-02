const { WatchWishlist } = require("../models");

class Controller {
  static ShowAllWishlist(req, res) {
    let UserId = req.user.id;
    WatchWishlist.findAll({ where: { UserId } })
      .then((data) => {
        console.log(data);
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
    let newWishlist = {
      category: req.body.category,
      type: req.body.type,
      UserId: req.user.id,
      MovieId: req.body.MovieId,
      posterPath: "https://image.tmdb.org/t/p/w500" + req.body.posterPath,
      title: req.body.title,
      releaseDate: req.body.releaseDate,
    };
    WatchWishlist.findOne({
      where: { id: newWishlist.MovieId, UserId: newWishlist.UserId },
    })
      .then((data) => {
        if (data) {
          res.status(200).json({ message: "Movie Has Already Been Added" });
        } else {
          return WatchWishlist.create(newWishlist);
        }
      })
      .then((data) => {
        res.status(201).json(data);
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
