const { User, Animal, FavoriteAnimal } = require('../models')
const { verify } = require('../helpers/jwt.js')

function Authentication(req, res, next) {
    const access_token = req.headers.access_token

    try {
        const decode = verify(access_token)
        User.findOne({
            where :{
                username: decode.username,
                email: decode.email
            }
        })
        .then((user) =>{
            if (!user) {
                next({ 
                    status: 401,
                    message: 'Please Login First'
                })
            } else {
                req.loggedUser = {
                    id: decode.id,
                    username: decode.username,
                    email: decode.email
                }
                next()
            }
        })
        .catch((err) => {
            next(err)
        })
    }
    catch {
        next({ 
            status: 401,
            message: 'Please Login First'
        })
    }
}

function Authorization(req, res, next) {
    FavoriteAnimal.findOne({
        where: {
            id: +req.params.id || null
        }
    })
    .then((data) =>{
        if (!data) {
            next ({
                status: 404,
                message: "Data Not Found"
            })
        } else {
            if(data.UserId != +req.loggedUser.id){
                next({ 
                    status: 401,
                    message: 'Unauthorized'
                })
            } else {
                next()
            }
        }
    })
    .catch((err) => {
        next(err)
    })
}


function checkToken(req, res, next){
    const access_token = req.headers.access_token

    if (!access_token) {
        req.loggedUser = {
            id: null
        }
        next()
    } else {
        const decode = verify(access_token)
        User.findOne({
            where :{
                username: decode.username,
                email: decode.email
            }
        })
        .then((user) =>{
            if (!user) {
                next({ 
                    status: 401,
                    message: 'Invalid Token'
                })
            } else {
                req.loggedUser = {
                    id: decode.id,
                    username: decode.username,
                    email: decode.email
                }
                next()
            }
        })
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = { Authentication, Authorization, checkToken }