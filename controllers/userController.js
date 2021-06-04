'use strict'
const { User } = require('../models')
const { verifyPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class Controller {
    static async register(req, res, next) {
        try {
            const { username, password } = req.body
            const newUser = await User.create({ username, password, point: 0 })
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
            const { id, point } = foundUser
            const access_token = signToken({
                id,
                username
            })
            res.status(200).json({
                id,
                username,
                point,
                access_token
            })
        } catch (err) {
            next(err)
        }
    }

    static async getAll(req, res, next) {
        try {
            const foundUsers = await User.findAll({
                attributes: { exclude: ['password'] },
                order: [['point', 'DESC']]
                // limit: 15
            })
            res.status(200).json(foundUsers)
        } catch (err) {
            next(err)
        }
    }

    static async updatePoint(req, res, next) {
        try {
            const { id } = req.params
            const { point } = req.body
            const result = await User.update({ point }, { where: { id } })
            if (!result[0]) throw { name: 'failedPointUpdate' }
            res.status(200).json({
                message: "User's point updated successfully!"
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller
