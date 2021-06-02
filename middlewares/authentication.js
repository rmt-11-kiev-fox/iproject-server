const { tokenVerifier } = require('../helpers/jwt')
const { User } = require('../models')


const authentication = async (req, res, next) => {
  const header = req.headers.access_token
  try {
    !header && next({ status: 403, msg: 'Forbidden' })
    const decoded = tokenVerifier(header)
    const foundUser = await User.findOne({ where: { id: decoded.id } })
    !foundUser && next({ status: 404, msg: "User Not Found" })
    const userData = {
      id: foundUser.id,
      email: foundUser.email,
    }
    req.user = userData
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication