const {Game} = require('../models')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const authentication = async (req,res,next) => {
  try {
    console.log(`Authentication is Processing, please wait......`)
    const {access_token} = req.headers
    let userData = jwt.verify(access_token, SECRET)
    let user = await Game.findOne({
      where:{
        name: userData.name
      }
    })

    if(user) {
      console.log(`Authentication has been accepted, Welcome, ${user.username}`);
      req.userData = userData
      next()
    }else{
      throw {message: 'User NOT Authenticated', statusCode: 401}
    }
  } catch (err) {
     return next(err)
  }
}

module.exports = {authentication}