const { User, Income, Expense, Report } = require('../models')
const { verifyToken } = require('../helpers/jwt')

async function authentication (req, res, next) {
  const { access_token } = req.headers
  try {
    if (access_token) {
        const decoded = verifyToken(access_token)
        const foundUser = await User.findByPk(decoded.id)
        if (foundUser) {
          req.currentUser = {
            id: foundUser.id,
            username: foundUser.username
          }
          next()
        } else {
          throw ({ status: 401, message: `Invalid access token!` })
        }
    } else {
      throw ({ status: 401, message: `Please login!` })
    }
  } catch (err) {
    next(err)
  }
}

async function authorizationIncome (req, res, next) {
  const id = +req.params.id
  const UserId = +req.currentUser.id
  try {
    const foundIncome = await Income.findByPk(id)
    if (!foundIncome) {
      throw ({ status: 404, message: `Request not found!` })
    } else {
      if (foundIncome.UserId !== UserId) {
        throw ({ status: 401, message: `Unauthorized request!` })
      } else {
        next()
      }
    }
  } catch (err) {
    next(err)
  }
}

async function authorizationExpenses (req, res, next) {
  const id = +req.params.id
  const UserId = +req.currentUser.id
  try {
    const foundExpenses = await Expense.findByPk(id)
    if (!foundExpenses) {
      throw ({ status: 404, message: `Request not found!` })
    } else {
      if (foundIncome.UserId !== UserId) {
        throw ({ status: 401, message: `Unauthorized request!` })
      } else {
        next()
      }
    }
  } catch (err) {
    next(err)
  }
}
  
module.exports = { authentication, authorizationIncome, authorizationExpenses }