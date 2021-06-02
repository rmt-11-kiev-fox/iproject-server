'use strict'
const { User } = require('../models')
const { verifyPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class Controller {
    static async register(req, res, next) {
        try {
            const { username, password } = req.body
            const newUser = await User.create({ username, password })
            res.status(201).json({
                id: newUser.id,
                username
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body
            const foundUser = await User.findOne({ where: { username } })
            if (!foundUser) throw { name: 'invalidLogin' }
            const isCorrectPassword = verifyPassword(
                password,
                foundUser.password
            )
            if (!isCorrectPassword) throw { name: 'invalidLogin' }
            const { id } = foundUser
            const access_token = signToken({
                id,
                username
            })
            res.status(200).json({
                id,
                username,
                access_token
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller
