const express = require('express')
const router = express.Router()
const Admin = require('../models').Admin
const Booking = require('../models').Booking
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendMail = require('../helpers/send-mail')
const axios = require('axios')
let PIMCoordinate = { lat:-6.2655, long: 106.7843}
let PSCoordinate = {lat:-6.2255, long: 106.7994}
let MtgCoordinate = {lat: -6.1964, long: 106.8293}

function geoAPI(coordinate) {
    return `https://geocode.xyz/${coordinate.lat},${coordinate.long}?json=1`
}

function weatherAPI(coordinate) {
    return `api.openweathermap.org/data/2.5/weather?lat=${coordinate.lat}&lon=${coordinate.long}&appid=332c23ca490b82d8dbb2befc4f007ff3`
}

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
    Booking.findAll({
        order: [
            ['id', 'ASC']
        ]
    })
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
        sendMail(req.body.email)
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

router.get('/locationPIM', (req, res, next)=>{
    axios.get(geoAPI(PIMCoordinate))
    .then(result=>{
        res.status(200).json(
            {coordinatePIM: {
                lat: result.data.inlatt,
                lng: result.data.inlongt
            }
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/locationPS', (req, res, next)=>{
    axios.get(geoAPI(PSCoordinate))
    .then(result=>{
        res.status(200).json(
            {coordinatePS: {
                lat: result.data.inlatt,
                lng: result.data.inlongt
            }
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/locationMtg', (req, res, next)=>{
    axios.get(geoAPI(MtgCoordinate))
    .then(result=>{
        res.status(200).json(
            {coordinateMtg: {
                lat: result.data.inlatt,
                lng: result.data.inlongt
            }
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/weatherPIM', (req, res, next)=>{
    axios.get(weatherAPI(PIMCoordinate))
    .then(result=>{
        res.status(200).json(
            {weather: {
                lunch: result.data.data.timelines[0].intervals[9].values.temperature,
                dinner: result.data.data.timelines[0].intervals[16].values.temperature
            }
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/weatherPS', (req, res, next)=>{
    axios.get(weatherAPI(PSCoordinate))
    .then(result=>{
        res.status(200).json(
            {weather: {
                lunch: result.data.data.timelines[0].intervals[9].values.temperature,
                dinner: result.data.data.timelines[0].intervals[16].values.temperature
            }
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/weatherMtg', (req, res, next)=>{
    axios.get(weatherAPI(MtgCoordinate))
    .then(result=>{
        res.status(200).json(
            {weather: {
                lunch: result.data.data.timelines[0].intervals[9].values.temperature,
                dinner: result.data.data.timelines[0].intervals[16].values.temperature
            }
        })
    })
    .catch(err=>{
        console.log(err);
    })
})


module.exports = router
