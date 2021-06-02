const {Favourite} = require('../models')

class FavouriteController {
    static getAllFav (req, res, next) {
        const userId = req.activeUser.id
        Favourite.findAll({where: {UserId: userId}})
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                next(err)
            })
    }

    static addFav (req, res, next) {
        const payload = {
            UserId: req.activeUser.id,
            teamKey: req.body.teamKey,
            teamName: req.body.teamName,
            leagueKey: req.body.leagueKey 
        }
        Favourite.create(payload)
            .then((createdFav) => {
                res.status(201).json(createdFav)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteFav (req, res, next) {
        const idToDelete = +req.body.idToDelete
        Favourite.destroy({ where: { id: idToDelete } })
            .then((data) => {
                if (data) {
                    res.status(200).json({success: {message: `Favourite id: ${idToDelete} deleted successfully`}})
                } else {
                    next({name: "Not Found", message:`Data with id ${idToDelete} not found`})
                }
            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = FavouriteController