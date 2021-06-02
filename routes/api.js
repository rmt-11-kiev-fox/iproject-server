const express = require("express");
const router = express();
const Controller = require("../controllers/api");

router.get("/movies/popular", Controller.showPopularMovies);
router.get("/movies/nowPlaying", Controller.showNowPlayingMovies);
router.get("/movies/similar", Controller.showSimilarMovies);
router.get("/movies/upcoming", Controller.showUpcomingMovies);
router.get("/movies/details", Controller.showMovieDetail);
router.get("/tv/popular", Controller.showPopularTv);
router.get("/tv/OnTheAir", Controller.showOnTheAirTv);
router.get("/tv/similar", Controller.showSimilarTv);
router.get("/news/movies", Controller.showMovieNews);
router.get("/news/tv", Controller.showTvNews);

module.exports = router;
