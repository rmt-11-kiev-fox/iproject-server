const { User, NewSpecies, Message } = require('../models/index')
const jwt = require('jsonwebtoken')
const { decryptPassword } = require('../helper/cryptografi')
const axios = require('axios')
const { OAuth2Client } = require('google-auth-library')

class Controller {
    static login(req, res, next) {

        let input = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({ where: { email: input.email } })
            .then(isFoundUser => {
                if (!isFoundUser) {
                    res.status(400).json({ msg: 'invalid email or password' })
                } else if (decryptPassword(input.password, isFoundUser.password)) {
                    const token = jwt.sign({ id: isFoundUser.id, email: isFoundUser.email }, process.env.PRIVATE_KEY)
                    res.status(200).json({ id: isFoundUser.id, email: isFoundUser.email, token })
                } else {
                    res.status(400).json({ msg: 'invalid email or password' })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }
    static register(req, res, next) {
        let input = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(input)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static GoogleLogin(req, res, next) {
        let emailGoogle = null
        let client = new OAuth2Client(process.env.CLIENT_ID)
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID
        }).then(ticket => {
            const payload = ticket.getPayload()
            emailGoogle = payload.email
            return User.findOne({ where: { email: emailGoogle } })
        }).then(user => {
            if (!user) {
                return User.create({ email: emailGoogle, password: process.env.PASSWORD_GOOGLE })
            } else {
                const token = jwt.sign({ id: user.id, email: user.email }, process.env.PRIVATE_KEY)
                res.status(200).json({ id: user.id, email: user.email, token })
            }
        }).then(newUser => {
            const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.PRIVATE_KEY)
            res.status(200).json({ id: newUser.id, email: newUser.email, token })
        }).catch(err => {
            res.status(500).json(err)
        })

    }

    static filterBySpecies(req, res, next) {
        let input = req.params.q
        const filter = `http://apiv3.iucnredlist.org/api/v3/species/category/${input}?token=${process.env.TOKEN_API}`
        axios({
            method: "GET",
            url: filter
        })
            .then(response => {
                const stringifyData = JSON.stringify(response.data.result)//convert to text
                const data = JSON.parse(stringifyData)//convert to json
                res.status(200).json(data)
            }).catch(err => {
                res.status(500).json(err)
            })
    }

    static filterByQountry(req, res, next) {
        let input = req.params.q
        const filter = `http://apiv3.iucnredlist.org/api/v3/country/getspecies/${input}?token=${process.env.TOKEN_API}`
        axios({
            method: "GET",
            url: filter
        })
            .then(response => {
                const stringifyData = JSON.stringify(response.data.result)//convert to text
                const data = JSON.parse(stringifyData)//convert to json
                res.status(200).json(data)
            }).catch(err => {
                res.status(500).json(err)
            })
    }
    static filterByKingdom(req, res, next) {
        let input = req.params.q
        const filter = `http://apiv3.iucnredlist.org/api/v3/comp-group/getspecies/${input}?token=${process.env.TOKEN_API}`
        axios({
            method: "GET",
            url: filter
        })
            .then(response => {
                const stringifyData = JSON.stringify(response.data.result)//convert to text
                const data = JSON.parse(stringifyData)//convert to json
                res.status(200).json(data)
            }).catch(err => {
                res.status(500).json(err)
            })
    }

    static addNewSpecies(req, res, next) {
        let input = {
            name: req.body.name,
            img_url: req.body.img_url,
            kingdom: req.body.kingdom,
            habitat: req.body.habitat,
            region: req.body.region,
            status: req.body.status
        }
        NewSpecies.create(input)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
    static DeleteNewSpecies(req, res, next) {
        const id = req.params.id
        NewSpecies.destroy({ where: { id } })
            .then(data => {
                res.status(200).json({ msg: 'delete sukses' })
            })
            .catch(err => {
                res.status(400).json(err)
            })

    }
    static updateNewSpecies(req, res, next) {
        let id = +req.params.id
        let input = {
            name: req.body.name,
            img_url: req.body.img_url,
            kingdom: req.body.kingdom,
            habitat: req.body.habitat,
            region: req.body.region,
            status: req.body.status
        }
        NewSpecies.update(input, { where: { id } })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })

    }
    static readNewSpecies(req, res, next) {
        NewSpecies.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
    static sendMsg(req, res, next) {
        let input = {
            user: req.body.user,
            msg: req.body.msg
        }

        Message.create(input)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static readMsg(req, res, next) {
        Message.findAll({ order: [['id', 'DESC']] })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = Controller