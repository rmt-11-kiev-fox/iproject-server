const { UserData, User, ExerciseLog, FoodLog } = require('../models')
const { Op } = require("sequelize");
// const sequelize = require('sequelize')
const moment = require('moment')
// const { Sequelize } = require('sequelize');

let date = new Date()
date = date.toISOString().split('T')[0]
// date = '2021-07-24' // ingat di comment lg for testing only boss

class fitnessController {
  static async postTodayData (req, res, next) {
    const data = {
      UserId : req.currentUser.id,
      currentWeight : req.body.currentWeight,
      date,
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0
    }

    try {
      const userData = await UserData.create(data)
      res.status(201).json(userData)
      
    } catch (error) {
      let errorName = 'ServerError'
      let listOfErrors = []
      let errorCode = 500

      if (error.name == 'SequelizeUniqueConstraintError') {
        errorName = error.name
        listOfErrors.push(`Cannot create duplication of data of today's date: ${date}`)
        errorCode = 400
      }
      else if (error.name == 'SequelizeValidationError') {
        errorName = error.name
        listOfErrors.push(error.errors[0].message)
        errorCode = 400
      }
      else if (error.name == 'SequelizeDatabaseError') {
        listOfErrors.push(`Calories, Protein, Carbohydrates, or Fat cannot be null`)
      }
    
      next({
        name: errorName,
        msg: listOfErrors,
        code: errorCode
      })
    }
  }

  static async getTodayData (req, res, next) {
    try {
      const UserId = req.currentUser.id

      const userData = await UserData.findOne({
        where: { date: date, UserId: UserId },
        include: [ ExerciseLog, FoodLog ]
      })

      if (userData != null) {
        res.status(200).json(userData)
      }
      else {
        throw { msg: `No data found`, code: 404, name: 'ResourceNotFound'}
      }

    } catch (error) {
      let errorName = 'ServerError'
      let listOfErrors = []
      let errorCode = 500
    
      if (error.name == 'ResourceNotFound') {
        errorName = error.name
        listOfErrors.push(error.msg)
        errorCode = error.code
      }
      if (error.name == 'SequelizeValidationError') {
        errorName = error.name
        listOfErrors.push()
        errorCode = 400
      }
    
      next({
        name: errorName,
        msg: listOfErrors,
        code: errorCode
      })
    }
  }

  static async getSpecificDateUserData (req, res, next) {
    try {
      const newSpecificTime = req.body.specificTime
      let specificTime = 'days'
      const UserId = req.currentUser.id
      let number = 7
      

      if (newSpecificTime == 'month') {
        number = 1
        specificTime = newSpecificTime
      }
      else if (newSpecificTime == 'year') {
        number = 1
        specificTime = newSpecificTime
      }

      let targetDate = moment().subtract(number, specificTime).toDate()
      targetDate = targetDate.toISOString().split('T')[0]

      const dataFound = await UserData.findAll({
        where: {
          date: {
            [Op.gte]: targetDate,
            [Op.lte]: date
          },
          UserId,
        },
        order: [['date', 'ASC']],
        include: [ ExerciseLog, FoodLog ]
      })
      
      res.status(200).json(dataFound)
    } catch (error) {
      next({
         name: 'ServerError',
         msg: error,
         code: 500
      })
    }
  }

  static async postTodayExercise (req, res, next) {
    try {
      const UserId = req.currentUser.id
      const TodayUserData = await UserData.findOne({
        where: { UserId, date: date }
      })
      
      const exercise = {
        UserDataId: TodayUserData.id,
        exerciseName: req.body.exerciseName,
        notes: req.body.notes,
        repetitions: req.body.repetitions,
        sets: req.body.sets,
        time: req.body.time,
      }

      const newExercise = await ExerciseLog.create(exercise)
      res.status(201).json(newExercise)

    } catch (error) {
      let errorName = 'ServerError'
      let listOfErrors = []
      let errorCode = 500
    
      if (error.name == 'SequelizeDatabaseError') {
        listOfErrors.push(`You must first create today's data user before creating any exercises`)
        errorName = 'ResourceNotFound'
        errorCode = 404
      }
      if (error.name == 'SequelizeValidationError') {
        errorName = error.name
        listOfErrors.push(error.errors[0].message)
        errorCode = 400
      }
      if (error.name == 'TypeError') {
        errorName = error.name
        listOfErrors.push(`There are no user data of today, make sure to make it first before adding exercise`)
        errorCode = 404
      }
    
      next({
        name: errorName,
        msg: listOfErrors,
        code: errorCode
      })
    }
  }

  static async postTodayFood (req, res, next) {
    try {
      const UserId = req.currentUser.id
      const todayUserData = await UserData.findOne({
        where: { UserId, date: date }
      })

      // pake transaction == gagal documentation g jlas

      const food = {
        UserDataId: todayUserData.id,
        foodName: req.body.foodName,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        calories: req.body.calories,
        protein: req.body.protein,
        carbohydrates: req.body.carbohydrates,
        fat: req.body.fat
      }

      const incrementNutrients = {
        calories: req.body.calories,
        protein: req.body.protein,
        carbohydrates: req.body.carbohydrates,
        fat: req.body.fat
      }

      const newFood = await FoodLog.create(food)

      if (newFood != null) {
        const increment = await UserData.increment(incrementNutrients, { where: { UserId, id: todayUserData.id }})

        res.status(200).json({ newlyAddedFood: newFood, previousData: todayUserData, updatedData: increment[0][0] })
      }
      else {
        throw {
          errorName:'ServerError',
          listOfErrors: [],
          errorCode: 500
        }
      }

    } catch (error) {
      let errorName = 'ServerError'
      let listOfErrors = []
      let errorCode = 500
    
      if (error.name == 'SequelizeDatabaseError') {
        listOfErrors.push(`You must first create today's data user before creating any food`)
        errorName = 'ResourceNotFound'
        errorCode = 404
      }
      if (error.name == 'SequelizeValidationError') {
        errorName = error.name
        listOfErrors.push(error.errors[0].message)
        errorCode = 400
      }
      if (error.name == 'TypeError') {
        errorName = error.name
        listOfErrors.push(`There are no user data of today, make sure to make it first before adding food`)
        errorCode = 404
      }
    
      next({
        name: errorName,
        msg: listOfErrors,
        code: errorCode
      })
    }
  }
  
  static async deleteTodayFood (req, res, next) {
    try {
      const id = req.params.id
      const UserId = req.currentUser.id
      const beforeDestroyFood = await FoodLog.findByPk(id, { include: [ UserData ]})

      const decrementNutrients = {
        calories: beforeDestroyFood.calories,
        protein: beforeDestroyFood.protein,
        carbohydrates: beforeDestroyFood.carbohydrates,
        fat: beforeDestroyFood.fat
      }

      if (beforeDestroyFood) {
        const decrement = await UserData.decrement(decrementNutrients, { where: { UserId, id: beforeDestroyFood.UserDatum.id }})

        if (decrement[0][1] == 1) {
          await FoodLog.destroy({ where: { id } })

          res.status(200).json({ message: `Successfully deleted food, the nutrients number will be subtracted from user data on date: ${beforeDestroyFood.UserDatum.date}`, previousData: beforeDestroyFood.UserDatum, updatedData: decrement[0][0] })
        }
        else {
          throw {
            errorName:'ServerError',
            listOfErrors: [],
            errorCode: 500
          }
        }

      }
      else {
        throw {
          errorName:'ServerError',
          listOfErrors: [],
          errorCode: 500
        }
      }

    } catch (error) {    
      let errorName = 'ServerError'
      let listOfErrors = error
      let errorCode = 500
    
      next({
        name: errorName,
        msg: listOfErrors,
        code: errorCode
      })
    }
  }

  static async patchTodayFood (req, res, next) {
    try {
      const id = req.params.id
      const UserId = req.currentUser.id
      const oldFoodData = await FoodLog.findByPk(id, { include: [ UserData ]})

      const newData = { // ini update abis old data di decrement
        foodName: req.body.foodName,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        calories: req.body.calories,
        protein: req.body.protein,
        carbohydrates: req.body.carbohydrates,
        fat: req.body.fat
      }

      const oldDataNutrients = { // di decrement dl baru increment yg baru
        calories: oldFoodData.calories,
        protein: oldFoodData.protein,
        carbohydrates: oldFoodData.carbohydrates,
        fat: oldFoodData.fat
      }

      const incrementNewData = { // di decrement dl baru increment yg baru
        calories: newData.calories,
        protein: newData.protein,
        carbohydrates: newData.carbohydrates,
        fat: newData.fat
      }

      await UserData.decrement(
        oldDataNutrients,
        { where: { UserId,id: oldFoodData.UserDatum.id }}
      )
      
      await FoodLog.update(newData, { where: { id }})
      
      const increment = await UserData.increment(
        incrementNewData,
        { where: { UserId, id: oldFoodData.UserDatum.id }}
      )

        res.status(200).json({
          message: `Successfully updated today's food`,
          previousData: oldFoodData.UserDatum,
          updatedData: increment[0][0]
        })

    } catch (error) {
      console.log(error);
      // res.send(error) // ingat hapus boss
    
      let errorName = 'ServerError'
      let listOfErrors = error
      let errorCode = 500
    
      if (error.name == 'SequelizeUniqueConstraintError') {
        errorName = error.name
        listOfErrors.push(error.errors[0].message)
        errorCode = 400
      }
      if (error.name == 'SequelizeValidationError') {
        errorName = error.name
        listOfErrors.push(error.errors[0].message)
        errorCode = 400
      }
    
      next({
        name: errorName,
        msg: listOfErrors,
        code: errorCode
      })
    }
  }

  static async deleteTodayExercise (req, res, next) {
    try {
      const id = req.params.id

      await ExerciseLog.destroy({ where: { id }})

      res.status(200).json({ message: `Succesfully deleted the exercise` })
    } catch (error) {
      let errorName = 'ServerError'
      let listOfErrors = error
      let errorCode = 500
    
      next({
        name: errorName,
        msg: listOfErrors,
        code: errorCode
      })
    }
  }

  static async patchTodayExercise (req, res, next) {
    try {
      const id = req.params.id
      const newData = {
        exerciseName: req.body.exerciseName,
        notes: req.body.notes,
        repetitions: req.body.repetitions,
        sets: req.body.sets,
        time: req.body.time
      }

      await ExerciseLog.update(newData, { where: { id }})
      res.status(200).json({ message: `Successfully updated today's exercise`})
    } catch (error) {
      let errorName = 'ServerError'
      let listOfErrors = error
      let errorCode = 500
    
      next({
        name: errorName,
        msg: listOfErrors,
        code: errorCode
      })
    }
  }
}

module.exports = fitnessController