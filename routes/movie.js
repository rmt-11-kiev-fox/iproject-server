const express = require("express");
const router = express();
const Controller = require("../controllers/movie");

router.get("/movies", Controller.showAllMovies);
// router.get("/movies/:categoryId", Controller.ShowMovieByCategory);
// router.get("/movies", Controller.showSimilarMovies);

module.exports = router;
