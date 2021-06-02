'use strict'
const { User, Chat } = require('../models')

class Controller {
    static async get(req, res, next) {
        try {
            const foundChats = await Chat.findAll({
                include: [
                    {
                        model: User,
                        attributes: { exclude: ['password'] }
                    }
                ],
                order: [['id', 'DESC']],
                limit: 50
            })
            res.status(200).json(foundChats)
        } catch (err) {
            next(err)
        }
    }

    static async post(req, res, next) {
        try {
            const UserId = req.user.id
            const { message } = req.body
            const newChat = await Chat.create({ UserId, message })
            res.status(201).json(newChat)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller
