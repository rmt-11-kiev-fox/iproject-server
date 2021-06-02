const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

let authentication = async function(req, res, next){
let access_token = req.headers.access_token
let JWT_SECRET = process.env.JWT_SECRET

  try{
    if (!access_token) throw {status: 403, message: 'please login first'}
    else{
      let decoded = jwt.verify(access_token, JWT_SECRET)

      if(!decoded){
        throw {status: 403, message: 'invalid token'}
      } else {
        let foundUser = await User.findByPk(decoded.id)
        if (!foundUser){
          throw {status: 403, message: 'forbiden'}
        } else {
          if(foundUser.email !== decoded.email){
            throw {status: 403, message: 'invalid User'}
          } else {
            req.currentUser = decoded
            
            next()
          }
        }
      }
    }
  }
  catch(err){
    let status = err.status || 403
    let message = err.status ? err.message : 'invalid token'
    res.status(status).json({message})
  }
}

module.exports = authentication