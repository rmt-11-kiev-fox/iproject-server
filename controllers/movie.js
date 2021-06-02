// let apiKey = "fcf3d00b4d1742944230e7b5210ec0c1"
let axios = require("axios");
let { Movie } = require("../models");

console.log("in");

class Controller {
  //   static showAllMovies(req, res, next) {
  //     let apiUrl =
  //       "https://api.themoviedb.org/3/movie/popular?api_key=fcf3d00b4d1742944230e7b5210ec0c1";
  //     axios
  //       .get(apiUrl)
  //       .then((data) => {
  //         res.status(200).json(data);
  //       })
  //       .catch((err) => {
  //         console.log(err, "show movie error");
  //       });
  //   }
  static showAllMovies(req, res, next) {
    Movie.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Controller;
