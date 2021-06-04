const fitnessController = require('../controllers/fitnessController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const fitnessRouter = require('express').Router()

fitnessRouter.use(authentication)

fitnessRouter.post('/', fitnessController.postTodayData)

fitnessRouter.get('/', fitnessController.getTodayData)

// specific ini bisa week / month / year
fitnessRouter.get('/date', fitnessController.getSpecificDateUserData)

fitnessRouter.post('/exercise', fitnessController.postTodayExercise)

fitnessRouter.post('/food', fitnessController.postTodayFood)

// authorization disini utk jaga2 spy g bisa edit ato hapus pux orng lain
fitnessRouter.use('/food/:id', authorization)

fitnessRouter.delete('/food/:id', fitnessController.deleteTodayFood)

fitnessRouter.patch('/food/:id', fitnessController.patchTodayFood)

fitnessRouter.use('/exercise/:id', authorization)

fitnessRouter.delete('/exercise/:id', fitnessController.deleteTodayExercise)

fitnessRouter.patch('/exercise/:id', fitnessController.patchTodayExercise)

module.exports = fitnessRouter