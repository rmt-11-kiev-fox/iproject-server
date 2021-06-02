const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static async register (req, res, next) {
    const { username, password } = req.body
    try {
      const user = await User.create({ username, password })
      res.status(201).json({user: {
        id: user.id,
        username: user.username
      }})
    } catch (err) {
      next(err)
    }
  }

  static async login (req, res, next) {
    const { username, password } = req.body
    try {
      const foundUser = await User.findOne({ where: { username } })
      if (foundUser) {
        const passwordMatched = comparePassword(password, foundUser.password)
        if (passwordMatched) {
          req.currentUser = {
            id: foundUser.id,
            username: foundUser.username
          }
          const access_token = generateToken({ id: foundUser.id, username: foundUser.username })
          res.status(200).json({ access_token })
        } else {
          throw ({ status: 400, message: `Invalid username/password` })
        }
      } else {
        throw ({ status: 400, message: `Invalid username/password` })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController