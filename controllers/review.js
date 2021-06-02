const { Review } = require("../models");

class Controller {
  static ShowAllMovieReview(req, res) {
    let MovieId = req.body.MovieId;
    Review.findAll({ where: { MovieId } })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static ShowAOneReview(req, res) {
    let MovieId = req.body.MovieId;
    let id = req.body.reviewId;
    Review.findOne({ where: { id, MovieId } })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static addReview(req, res) {
    let newReview = {
      UserId: req.user.id,
      MovieId: req.body.MovieId,
      review: req.body.review,
      rating: req.body.rating,
      title: req.body.title,
    };
    Review.create(newReview, { returning: true })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static putEditReview(req, res) {
    console.log("in puteditreview");
    let id = req.body.reviewId;
    let newReview = {
      UserId: req.user.id,
      MovieId: req.body.MovieId,
      review: req.body.review,
      rating: req.body.rating,
      title: req.body.title,
    };
    Review.update(newReview, { where: { id }, returning: true })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteReviewlist(req, res) {
    let id = req.body.reviewId;
    Review.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ message: "review successfully deleted" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Controller;
