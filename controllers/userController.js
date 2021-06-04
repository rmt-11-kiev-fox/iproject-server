const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { comparePassword } = require('../helpers/compare-pwd')
const JWT_SECRET = process.env.JWT_SECRET
const GOOGLE_LOGIN_ID = process.env.GOOGLE_LOGIN_ID
const { OAuth2Client } = require('google-auth-library')

class userController{

  static register(req, res, next){
    const bdy = req.body
    const newUser = {
      email: bdy.email,
      password: bdy.password,
      fullname: bdy.fullname,
      address: bdy.address
    }
    User.create(newUser)
    .then((data) => {
      // console.log(data, );
      if(!data) next({code: 400, msg: 'error input!'})
      else res.status(201).json({id:data.id, email:data.email, fullname:data.fullname})
    })
    .catch((err) => {
      next(err)
    })
  }

  static login (req, res, next){
    let { email, password } = req.body
    User.findOne({ where: { email } })
    .then((data) => {
      if (!data){
        next({
          code:404,
          msg: 'user not found'
        })
      } else {
        if (comparePassword(password, data.password)){
          // console.log(data.role)
          let access_token = jwt.sign({id: data.id, email: data.email, isAdmin: data.isAdmin}, JWT_SECRET)
          res.status(200).json({access_token,email: data.email, fullname: data.fullname, address: data.address, isAdmin: data.isAdmin })
        } else {
          next({
            code:400,
            msg: 'wrong email or password'
          })
        }
      }
    })
    .catch(err => {
      next(err)
    })
  }
  static googleLogin(req, res, next){
    const client = new OAuth2Client(GOOGLE_LOGIN_ID)
    let email = ''
    // console.log('req', req.body)
    client.verifyIdToken({
      idToken: req.body.token,
      audience: GOOGLE_LOGIN_ID
    })
    .then((ticket) => {
      // console.log('ticket')
      const payload = ticket.getPayload()
      email = payload.email
      return User.findOne({ where: { email } })
    })
    .then((data) => {
      // console.log(data, 'DATAAAAA')
      if(!data){
        return User.create({
          email: email,
          password: process.env.GOOGLE_PWD
        })
        .then((newData) => {
          // console.log(newData, 'NEWWWWWW')
          let access_token = jwt.sign({id: newData.id, email: newData.email}, JWT_SECRET)
          // console.log(access_token, 'new create')
          res.status(201).json({access_token})
        })
      } else {
        let access_token = jwt.sign({id: data.id, email: data.email}, JWT_SECRET)
        // console.log(access_token, 'udh ada data')
        res.status(200).json({access_token})
      }
    })
    
    .catch((err) => {
      next(err)
    })
  }
}

module.exports = userController