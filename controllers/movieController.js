const axios = require('axios')

class MovieController {
    static fetchComingSoonMovie(req, res) {
        axios({
            url: 'https://bioskop-api-zahirr.herokuapp.com/api/comingsoon/all',
            method: 'GET'
        })
            .then(movies => {
                // console.log(movies.data.result.hasil);
                let response = movies.data.result.hasil
                res.status(200).json(response)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message })
            })
    }

    static fetchNowPlaying(req, res) {
        axios({
            url: 'https://bioskop-api-zahirr.herokuapp.com/api/now-playing',
            method: 'GET'
        })
            .then(movies => {
                // console.log(movies.data.result.hasil);
                let response = movies.data.result.hasil
                res.status(200).json(response)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message })
            })
    }

    static fetchCinema(req, res) {
        axios({
            url: 'https://bioskop-api-zahirr.herokuapp.com/api/bioskop/all',
            method: 'GET'
        })
            .then(cinemas => {
                // console.log(cinemas.data.result.hasil);
                let response = cinemas.data.result.hasil
                res.status(200).json(response)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message })
            })
    }

    static searchMovieByName(req, res) {
        console.log(req.query.query);
        console.log(req.query.page);
        console.log(req.params);
        console.log(req.body);
        // axios({
        //     url: 'https://advanced-movie-search.p.rapidapi.com/search/movie',
        //     method: 'GET',
        //     params: {query: 'kong', page: '1'},
        //     headers: {
        //         'x-rapidapi-key': '7271e4e735msh9fa9ed372c92e91p15f594jsn2b4acb379336',
        //         'x-rapidapi-host': 'advanced-movie-search.p.rapidapi.com'
        //     }
        // })
        //     .then(movies => {
        //         console.log(movies);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.status(500).json({ message: err.message })
        //     })
    }
}

module.exports = MovieController