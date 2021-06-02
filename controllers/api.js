let axios = require("axios");

class Controller {
  static showMovieDetail(req, res, next) {
    let MovieId = req.body.MovieId;
    let apiUrl = `https://api.themoviedb.org/3/movie/$${MovieId}?api_key=fcf3d00b4d1742944230e7b5210ec0c1&language=en-US`;
    axios
      .get(apiUrl)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err, "show similar movies error");
      });
  }
  static showPopularMovies(req, res, next) {
    let apiUrl =
      "https://api.themoviedb.org/3/movie/popular?api_key=fcf3d00b4d1742944230e7b5210ec0c1";
    axios
      .get(apiUrl)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err, "show movie error");
      });
  }
  static showNowPlayingMovies(req, res, next) {
    let apiUrl =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=fcf3d00b4d1742944230e7b5210ec0c1&language=en-US";
    axios
      .get(apiUrl)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err, "show now playing movies error");
      });
  }
  static showSimilarMovies(req, res, next) {
    let MovieId = req.body.MovieId;
    let apiUrl = `https://api.themoviedb.org/3/movie/${MovieId}/similar?api_key=fcf3d00b4d1742944230e7b5210ec0c1&language=en-US`;
    axios
      .get(apiUrl)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err, "show similar movies error");
      });
  }
  static showUpcomingMovies(req, res, next) {
    let apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=fcf3d00b4d1742944230e7b5210ec0c1&language=en-US`;
    axios
      .get(apiUrl)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err, "show upcoming movies error");
      });
  }
  static showTvDetail(req, res, next) {
    let TvId = req.body.TvId;
    let apiUrl = `https://api.themoviedb.org/3/tv/${TvId}?api_key=fcf3d00b4d1742944230e7b5210ec0c1&language=en-US`;
    axios
      .get(apiUrl)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err, "show similar movies error");
      });
  }
  static showPopularTv(req, res, next) {
    let apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=fcf3d00b4d1742944230e7b5210ec0c1&language=en-US&page=1`;
    axios
      .get(apiUrl)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err, "show upcoming movies error");
      });
  }
  static showOnTheAirTv(req, res, next) {
    let apiUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=fcf3d00b4d1742944230e7b5210ec0c1&language=en-US`;
    axios
      .get(apiUrl)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err, "show upcoming movies error");
      });
  }
  static showSimilarTv(req, res, next) {
    let TvId = req.body.TvId;
    let apiUrl = `https://api.themoviedb.org/3/tv/${TvId}/similar?api_key=fcf3d00b4d1742944230e7b5210ec0c1&language=en-US`;
    axios
      .get(apiUrl)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err, "show similar movies error");
      });
  }
  static showMovieNews(req, res, next) {
    let apiUrl = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=movie&pageNumber=1&pageSize=50&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null`;
    axios
      .get(apiUrl)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err, "show similar movies error");
      });
  }
  static showTvNews(req, res, next) {
    let apiUrl = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=us tv series&pageNumber=1&pageSize=50&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null`;
    axios
      .get(apiUrl)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err, "show similar movies error");
      });
  }
}

module.exports = Controller;
