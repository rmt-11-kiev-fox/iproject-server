const {AnimeFav,User} = require('../models')

class AnimeFavController{
    static getAnime(req,res,next){
        AnimeFav.findAll({include:User})
        .then(anime=>{
            res.status(200).json({anime})
        })
        .catch(err=>{
            res.status(500).json({message:"Internal Server Error"})
        })
    }

    static postAnime(req,res,next){
        let createAnime = {
            name:req.body.name,
            picture:req.body.picture,
            description:req.body.description,
            UserId: req.user.id
        }
        AnimeFav.create(createAnime)
        .then(anime=>{
            res.status(201).json({anime})
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static deleteAnime(req,res,next){
        let id = req.params.id
        AnimeFav.destroy({where:{id}})
        .then(anime=>{
            if(anime){
                res.status(200).json({message:"Anime Success to delete"})
            }else{
                res.status(404).json({message:"Anime not Found"})
            }
        }).catch(err=>{
            next(err)
        })
    }
}

module.exports = AnimeFavController