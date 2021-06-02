let axios = require("axios");

class Controller {
  static showMovieDetail(req, res, next) {
    let MovieId = +req.params.movieId;
    // console.log(MovieId, "movieId");
    let apiUrl = `https://api.themoviedb.org/3/movie/${MovieId}?api_key=fcf3d00b4d1742944230e7b5210ec0c1&language=en-US`;
    axios
      .get(apiUrl)
      .then(({ data }) => {
        const stringData = JSON.stringify(data);
        const parseData = JSON.parse(stringData);
        res.status(200).json({ data: parseData });
      })
      .catch((err) => {
        console.log(err, "show detail movies error");
      });
  }
  static showPopularMovies(req, res, next) {
    let apiUrl =
      "https://api.themoviedb.org/3/movie/popular?api_key=fcf3d00b4d1742944230e7b5210ec0c1";
    axios
      .get(apiUrl)
      .then(({ data }) => {
        const stringData = JSON.stringify(data);
        const parseData = JSON.parse(stringData);
        res.status(200).json({ data: parseData });
      })
      .catch((err) => {
        console.log(err, "show popular movie error");
      });
  }
  static showNowPlayingMovies(req, res, next) {
    let apiUrl =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=fcf3d00b4d1742944230e7b5210ec0c1&language=en-US";
    axios
      .get(apiUrl)
      .then(({ data }) => {
        const stringData = JSON.stringify(data);
        const parseData = JSON.parse(stringData);
        res.status(200).json(parseData);
      })
      .catch((err) => {
        console.log(err, "show now playing movies error");
      });
  }
  static showSimilarMovies(req, res, next) {
    let MovieId = +req.body.MovieId;
    // console.log(req.body, "similar movies id");
    let apiUrl = `https://api.themoviedb.org/3/movie/${MovieId}/similar?api_key=fcf3d00b4d1742944230e7b5210ec0c1&language=en-US`;
    axios
      .get(apiUrl)
      .then(({ data }) => {
        const stringData = JSON.stringify(data);
        const parseData = JSON.parse(stringData);
        res.status(200).json(parseData);
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
    axios({
      method: "GET",
      url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI",
      params: {
        q: "Movies",
        pageNumber: "1",
        pageSize: "10",
        autoCorrect: "true",
        fromPublishedDate: "null",
        toPublishedDate: "null",
      },
      headers: {
        "x-rapidapi-key": "a33cc8bdcfmshdb86d36d8403c15p1daef4jsn3e2ef43c3703",
        "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    })
      .then(({ data }) => {
        const stringData = JSON.stringify(data);
        const parseData = JSON.parse(stringData);
        res.status(200).json({ data: parseData });
      })
      .catch((err) => {
        console.log(err, "show movie news error");
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
