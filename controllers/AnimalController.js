const { Animal, User, FavoriteAnimal } = require('../models')

class AnimalController {

    static getAnimals(req, res, next){
        
        Animal.findAll({
            include: {
                model: User,
                attributes: { exclude: ['username', 'email', 'password', 'createdAt', 'updatedAt'] },
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            order: [['id', 'ASC']]
        })
        .then((animals) => {
            res.status(200).json({
                UserId: req.loggedUser.id,
                animals
            })
        })
        .catch((err) => {
            next(err)
        })
    }

    static getAnimalById(req, res, next){

        Animal.findOne({
            where: {
                id: +req.params.animalId
            },
            include: {
                model: User,
                attributes: { exclude: ['username', 'email', 'password', 'createdAt', 'updatedAt'] },
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        })
        .then((animal) => {
            if (!animal) {
                throw ({
                    status: 404,
                    message: `Animal with ID ${req.params.animalId} not Found`
                })
            } else {
                res.status(200).json({
                    UserId: req.loggedUser.id,
                    animal
                })
            }
        })
        .catch((err) => {
            next(err)
        })
    }

    static addToFavorite(req, res, next){
        
        Animal.findOne({
            where: {
                id: req.params.animalId
            }
        })
        .then((animal) => {
            if (!animal) {
                throw ({
                    status: 404,
                    message: `Animal with ID ${req.params.animalId} not Found`
                })
            } else {
                return FavoriteAnimal.findOne({
                    where: {
                        UserId: +req.loggedUser.id,
                        AnimalId: +req.params.animalId
                    }
                })
            }
        })
        .then((favorite) => {
            if (!favorite) {
                FavoriteAnimal.create({
                    UserId: +req.loggedUser.id,
                    AnimalId: +req.params.animalId
                })
            } else {
                throw ({
                    status: 400,
                    message: 'This Animal is Already in Your Favorite List'
                })
            }
        })
        .then((resp) => {
            res.status(201).json({
                message: "Success"
            })
        })
        .catch((err) => {
            next(err)
        })
    }

    static removeFromFavorite(req, res, next){

        Animal.findOne({
            where: {
                id: req.params.animalId
            }
        })
        .then((animal) => {
            if (!animal) {
                throw ({
                    status: 404,
                    message: `Animal with ID ${req.params.animalId} not Found`
                })
            } else {
                return FavoriteAnimal.destroy({
                    where: {
                        UserId: +req.loggedUser.id,
                        AnimalId: +req.params.animalId
                    }
                })
            }
        })
        .then((resp) => {
            if (resp == 0) {
                throw ({
                    status: 400,
                    message: 'Remove Failed'
                })
            } else {
                res.status(200).json({
                    message: 'Remove Success'
                })
            }
        })
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = AnimalController