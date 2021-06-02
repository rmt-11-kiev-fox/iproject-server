const { User } = require ('../models')
const { checkPassword } = require('../helpers/bcryptjs.js')
const { generateToken } = require('../helpers/jwt.js')

class UserController {

    static register(req, res, next){
        const { username, email, password } = req.body
        User.create({
            username: username || '',
            email: email || '',
            password: password || ''
        })
        .then(({ id, username, email }) => {
            res.status(201).json({
                id,
                username,
                email
            })
        })
        .catch((err) => {
            next(err)
        })
    }

    static login(req, res, next){
        User.findOne({
            where: {
                email: req.body.identity || ''
            }})
        .then((data) =>{
            if (!data) {
                return User.findOne({
                    where: {
                        username: req.body.identity || ''
                    }})
            } else {
                return data
            }
        })
        .then((user) =>{
            if (!user) {
                throw ({ 
                    status: 400,
                    message: 'Invalid email/username or password'
                })
            } else {
                if (!checkPassword(req.body.password || '', user.password)) {
                    throw ({
                        status: 400,
                        message: 'Invalid email/username or password'
                    })
                } else {
                    const jwtToken = generateToken({
                        id: user.id,
                        email: user.email,
                        username: user.username
                    })
                    res.status(200).json({
                        username: user.username,
                        access_token: jwtToken
                    })
                }
            }
        })
        .catch((err) => {
            next(err)
        })
    }

}

module.exports = UserController