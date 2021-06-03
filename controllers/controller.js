const {User, Collect} = require('../models')
const {comparePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const nodemailer = require('nodemailer')

class Controller {
    static register(req, res, next) {
        const {email, password, name, address, category, message} = req.body
        User.create({
            email, password, name, address, category, message
        })
        .then(user => {
            res.status(201).json({id: user.id, name: user.name, email: user.email, address: user.address, category: user.category, message: user.message})
        })
        .catch(err => {
            next({name: 'Invalid'})
        })
    }
    
    static login(req, res, next) {
        const {email, password} = req.body
        User.findOne({where: {email}})
        .then(user => {
            if(!user) {
                next({ name: 'InvalidEmailPass' })    
            } else {
                const isPassMatch = comparePass(password, user.password)
                if (!isPassMatch) {
                    next({ name: 'InvalidEmailPass' })
                } else {
                    const access_token = generateToken({
                        id: user.id,
                        email: user.email
                    })
                    res.status(200).json({access_token})
                }
            }
        })
        .catch(err => {
            next({ name: 'Invalid' })
        })
    }

    static createCollect(req, res, next) {
        Collect.create({
            name: req.body.name,
            address: req.body.address,
            date: req.body.date,
            notes: req.body.notes,
            UserId: req.loggedUser.id
        })
        .then(data => {
            res.status(201).json(data)

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: req.loggedUser.email,
                    pass: 'tes123456'
                }
            })

            const options = {
                from: req.loggedUser.email,
                to: 'indharamerta@gmail.com',
                subject: 'New Collect Request For Better World',
                text: `<h3>Please Reply This Message For Confirmation</h3><br>
                Name: ${data.name}<br>
                Address: ${data.address}<br>
                Collect Date: ${data.date}<br>
                Notes: ${data.notes}`
            }

            transporter.sendEmail(options, (err, info) => {
                if(err) {
                    console.log(err)
                    return
                } 
                console.log('Sent: ' + info.response)
            })
        })
        .catch(err => {
            if(err.name === 'SequelizeValidationError') {
                const msg = []
                err.errors.forEach(err => {
                    msg.push(err.message)
                })
                res.status(400).json({ message: msg })
            } else {
                next(err)
            }
        })
    }

    static showCollect(req, res, next) {
        Collect.findAll({
            where: {UserId: req.loggedUser.id}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller