const { verify } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
   try {
      if (req.headers.access_token) {
         const token = req.headers.access_token
         const decoded = verify(token)
         
         const user = await User.findByPk(decoded.id)

         if (user.id) {
            req.currentUser = {
               userName: user.userName,
               email: user.email,
               id: user.id,
            }
            next()
         }
         else {
            next({
               name: 'JsonWebTokenError',
               msg: `Access denied`,
               code: 404
            })
         }         
      }
      else {
         res.status(404).json({
            message: 'Please login first'
         })
      }
   } catch (error) {
      console.log('--------------------------------', error ,'------------------------------------------');
      next({
         name: 'JsonWebTokenError',
         msg: error.message,
         code: 400
      })
   }
}

module.exports = authentication