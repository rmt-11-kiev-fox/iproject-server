const {User} = require('../models')
const { OAuth2Client } = require('google-auth-library')
const { validatePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
class UserController {
    static register(req, res, next) {
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
          .then((createdUser) => {
            const response = {
              id: createdUser.id,
              email: createdUser.email,
              username: createdUser.username
            }
            res.status(201).json(response)
          })
          .catch((err) => {
            if (err.name === "SequelizeUniqueConstraintError") {
                next({name: err.name, message:"This email already exist"})
            } else {
                next(err)
            }
          })
    }

    static login(req, res, next) {
        const logUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where: {
            email: logUser.email
        }})
            .then((foundUser) => {
                if (!foundUser) {
                    next({name: 'Invalid email and password'})
                } else if ( validatePassword(logUser.password, foundUser.password) ) {
                    const token = createToken({ id: foundUser.id, username: foundUser.username, email: foundUser.email })
                    res.status(200).json({ access_token: token, username: foundUser.username })
                } else {
                    next({name: "invalid email and password"})                    
                }
            })
    }

    static googleLogin(req, res, next){
        console.log(req.body.idToken);
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        let email = ``
        let username = ``
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then((ticket)=>{
                const payload = ticket.getPayload()
                email = payload.email
                username = payload.name
                return User.findOne({where: { email } })
            })
            .then((user) => {
                if (!user) {
                    return User.create({username: username, email: email, password: process.env.GOOGLE_PASSWORD})
                } else {
                    const token = createToken({id:user.id, email:user.email})
                    res.status(200).json({ access_token: token })
                }
            })
            .then(createdUser => {
                const token = createToken({id:createdUser.id, email:createdUser.email})
                res.status(201).json({ access_token: token })
            })
            .catch((err)=>{
                console.log(err);
                next(err)
            })
    }
}

module.exports = UserController