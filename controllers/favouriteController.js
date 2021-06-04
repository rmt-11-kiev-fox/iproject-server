const { Favourite } = require('../models')
const axios = require('axios')

class FavouriteController {
    static addWatchList(req, res) {
        let movieTitle = req.body.title
        // console.log(req.loggedUser);
        axios({
            url: 'https://bioskop-api-zahirr.herokuapp.com/api/now-playing',
            method: 'GET'
        })
            .then(movies => {
                let data = movies.data.result.hasil
                if (data) {
                    let foundMovie = data.filter(el => el.title === movieTitle)
                    // console.log(foundMovie);
                    if (foundMovie) {
                        Favourite.create({
                            title: foundMovie[0].title,
                            imageUrl: foundMovie[0].img,
                            UserId: req.loggedUser
                        })
                            .then(data => {
                                res.status(201).json(data)
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({ message: err.message })
                            })
                    }else {
                        res.status(404).json('Movie is not found')
                    }
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message })
            })
    }

    static fetchDataFavourite(req, res) {
        Favourite.findAll({
            attributes: {
                exclude: [ 'createdAt', 'updatedAt' ]
            }
        })
            .then(movies => {
                // console.log(movies);
                res.status(200).json(movies)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message })
            })
    }

    static deleteWatchList(req, res) {
        // console.log(req.body.WatchlistId, '<<<<masuk controller favourite');
        // let id = req.body.WatchlistId
        Favourite.destroy({
            where: {
                id: req.body.WatchlistId
            }
        })
            .then(() => {
                res.status(200).json({ message: 'Watchlist deleted successfully' })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message })
            })
    }
}

module.exports = FavouriteController