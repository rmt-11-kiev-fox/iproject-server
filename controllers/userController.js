const { User } = require('../models')
const { compare } = require('../helpers/bcrypt.js')
const { sign } = require('../helpers/jwt.js')
const { OAuth2Client } = require('google-auth-library')
const generator = require('generate-password')

class UserController {
    static register(req, res) {
        let dataInput = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        // console.log(dataInput);
        User.create(dataInput)
            .then(newUser => {
                let response = {
                    id: newUser.id,
                    email:newUser.email,
                    username: newUser.username
                }
                res.status(201).json(response)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message })
            })
    }

    static login(req, res) {
        // console.log(req.body, '<<<<< ini di controller login');
        let dataLogin = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({ where: {
            email: dataLogin.email
        }})
            .then(foundUser => {
                // console.log(foundUser);
                if (foundUser && compare(dataLogin.password, foundUser.password)) {
                    let payload = {
                        id: foundUser.id,
                        email: foundUser.email
                    }
                    let access_token = sign(payload)
                    res.status(200).json({ id: foundUser.id, username: foundUser.username, access_token })
                } else {
                    res.status(404).json('Invalid email or password')
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message })
            })
    }

    static googleLogin(req, res) {
        // console.log(req.body.idToken);
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        let email
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                email = payload.email
                return User.findOne({ where: { email } })
            })
            .then(user => {
                let newPassword = generator.generate({ length: 8, numbers: true })
                console.log(newPassword, '<<<<ini password baru');
                if(user) {
                    const access_token = sign({
                        id: user.id,
                        email: user.email
                    })
                    res.status(200).json({ username: user.username, access_token })
                } else {
                    return User.create({
                        email: email,
                        password: newPassword
                    })
                }
            })
            .then(newUser => {
                console.log(newUser, '<<<<di googlelogin');
                const access_token = sign({
                    id: newUser.id,
                    email: newUser.email
                })
                res.status(201).json({ username: user.username, access_token })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message })
            })
    }
}

module.exports = UserController