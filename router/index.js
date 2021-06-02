const express = require('express')
const router = express.Router()
const Admin = require('../models').Admin
const Booking = require('../models').Booking
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class BcryptPassword{
    static hashPassword(pass){
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(pass,salt)
        return hash
    }
    static checkHash(pass, hash){
        let check = bcrypt.compareSync(pass, hash)
        return check
    }
}

const authentication = (req, res, next) =>{
    try {
        if( req.headers.access_token) {
            const decoded = jwt.verify(req.headers.access_token, 'test')
            Admin.findByPk(decoded.id)
                .then(result=>{
                    if (result) {
                        req.loggedIn = {
                            id: decoded.id,
                            username: decoded.username
                        }
                        next()
                    } else {
                        res.status(401).json({
                            message: 'not authorized'
                        })
                    }
                })
                .catch(err =>{
                    console.log(err);
                })
        } else {
            res.status(403).json({
                message: 'not login'
            })
        }
    } catch (err) {
        console.log(err);
    }
}

router.post('/signIn', (req, res, next)=>{
    Admin.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(result=>{
        if(BcryptPassword.checkHash(req.body.password, result.password)) {
            let access_token = jwt.sign({
                id: result.id,
                username: result.username,
            }, 'test')
            res.status(200).json({
                username: result.username,
                access_token: access_token
            })
        } else {
            res.status(400).json({
                message: 'validation error'
            })
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/bookings', authentication, (req, res, next)=>{
    Booking.findAll({})
    .then(result=>{
       res.status(200).json({bookings: result})
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/bookings', (req, res, next)=>{
    Booking.create({
        name: req.body.name,
        email:req.body.email,
        people: req.body.people,
        notes: req.body.notes
    })
    .then(result=>{
        res.status(201).json({bookings:result})
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message: 'internal error'
        })
    })
})

router.put('/bookings/:id', authentication, (req, res, next)=>{
    Booking.update({
        name: req.body.name,
        email:req.body.email,
        people: req.body.people,
        notes: req.body.notes
    },{
        where: {
            id: req.params.id
        },
        returning: true
    })
    .then(result=>{
        res.status(201).json({booking:result[1]})
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message: 'internal error'
        })
    })
})

router.delete('/bookings/:id', authentication, (req, res, next)=>{
    Booking.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result=>{
        res.status(201).json({message:'delete success'})
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message: 'internal error'
        })
    })
})


module.exports = router
