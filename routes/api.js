const express = require("express");
const router = express();
const Controller = require("../controllers/api");
// const authentication = require("../middlewares/authentication");

router.get("/movies/popular", Controller.showPopularMovies);
router.get("/movies/nowPlaying", Controller.showNowPlayingMovies);
router.post("/movies/similar", Controller.showSimilarMovies);
router.get("/movies/upcoming", Controller.showUpcomingMovies);
router.get("/news/movies", Controller.showMovieNews);
router.get("/movies/detail/:movieId", Controller.showMovieDetail);

module.exports = router;
