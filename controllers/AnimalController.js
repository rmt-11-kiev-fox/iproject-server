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
}

module.exports = AnimalController