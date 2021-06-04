const { User, ExerciseLog, FoodLog } = require('../models')
let date = new Date()
date = date.toISOString().split('T')[0]

const authorization = async (req, res, next) => {
   try {
      const id = +req.params.id
      const currentUserId = req.currentUser.id
      let checkedItem;
      let counter = 0

      // const checkedUser = await User.findOne({
      //    where: { id },
      // })

      const checkedFood = await FoodLog.findOne({
         where: { id: id },
         include: { all: true, nested: true }
      })
      
      const checkedExercise = await ExerciseLog.findOne({
         where: { id: id },
         include: { all: true, nested: true }
      })

      // if (checkedUser != null) {
      //    if (checkedUser.id == currentUserId) {
      //       next()
      //    }
      //    else {
      //       next({
      //          name: 'BadRequest',
      //          msg: 'You are not authorized',
      //          code: 401
      //       })
      //    }
      // }

      if (checkedFood != null) {
         checkedItem = checkedFood
         counter++
      }

      if (checkedExercise != null) {
         checkedItem = checkedExercise
         counter++
      }

      if (counter >= 1) {
         if (checkedItem.UserDatum.UserId == currentUserId) {
            if (checkedItem.UserDatum.date == date) {
               next()
            }
            else {
               next({
                  name: 'BadRequest',
                  msg: 'You cannot modify or delete a history item',
                  code: 400
               })
            }
         }
         else {
            next({
               name: 'BadRequest',
               msg: 'You are not authorized',
               code: 401
            })
         }
      }
      else {
         next({
            name: 'ResourceNotFound',
            msg: 'No Item found',
            code: 404
         }) 
      }

   } catch (error) {
      console.log('--------------------------------', error ,'------------------------------------------');
      // res.send(error)
      next({
         name: error.name,
         msg: error.message,
         code: 500
      }) 
   }
}

module.exports = authorization