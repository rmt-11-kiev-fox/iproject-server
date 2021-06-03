const {Game} = require('../models')
const jwt = require('jsonwebtoken')
const {
  randomDrink,
  specificDrink,
  halalDrinks,
  nonHalalDrinks
} = require('../helpers/drinksAPI')
const SECRET = process.env.SECRET

class UserCTRL{
  static async register(req,res,next){
    try {
      const {name} = req.body
      const newUser = await Game.create({name})
      let user = await Game.findOne({
        where:{
          name
        }
      })
      let toToken = {id: user.id, name: user.name}
      const access_token = jwt.sign(toToken, SECRET)
      return res.status(200).json({access_token})
    } catch (err) {
        next(err)
    }
  }
  static async random (req,res,next){
    try {
      let random = await randomDrink()
      return res.status(200).json(random)
    } catch (err) {
      next(err)
    }
  }
  static async specific (req,res,next){
    try {
      let specific = await specificDrink(req.body.name)
      return res.status(200).json(specific)
    } catch (err) {
      next(err)
    }
  }
  static async halal (req,res,next){
    try {
      let halal = await halalDrinks()
      return res.status(200).json(halal)
    } catch (err) {
      next(err)
    }
  }
  static async nonHalal (req,res,next){
    try {
      let nonHalal = await nonHalalDrinks()
      return res.status(200).json(nonHalal)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserCTRL