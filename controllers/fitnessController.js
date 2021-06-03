const { UserData, User, ExerciseLog, FoodLog } = require('../models')
const { Op } = require("sequelize");
// const sequelize = require('sequelize')
const moment = require('moment')
// const { Sequelize } = require('sequelize');

let date = new Date()
date = date.toISOString().split('T')[0]
// date = '2021-05-29' // ingat di comment lg for testing only boss

class fitnessController {
  static async postTodayData (req, res, next) {
    const data = {
      UserId : req.currentUser.id,
      currentWeight : req.body.currentWeight,
      date,
      calories: 0,
      

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
      else {
        listOfErrors = error
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
      console.log(error);
      // res.send(error) // ingat hapus boss
    
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
      const TodayUserData = await UserData.findOne({
        where: { UserId, date: date }
      })

      // pake transaction == gagal documentation g jlas
      // let t = await sequelize.transaction()

      const food = {
        UserDataId: TodayUserData.id,
        foodName: req.body.foodName,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        calories: req.body.calories,
        protein: req.body.protein,
        carbohydrates: req.body.carbohydrates,
        fat: req.body.fat
      }

      console.log('--------------------------------', food ,'------------------------------------------');

      const incrementNutrients = {
        calories: req.body.calories,
        protein: req.body.protein,
        carbohydrates: req.body.carbohydrates,
        fat: req.body.fat
      }

      console.log('--------------------------------', incrementNutrients ,'------------------------------------------');

      // const newFood = await FoodLog.create(food, { t })

      await UserData.increment(incrementNutrients, { where: { UserId }})

      // await t.commit()
      
      // res.status(201).json(newFood)

      // const result = await sequelize.transaction(async (transaction) => {
      //   const newFood = await FoodLog.create(food, { transaction })

      //   await UserData.increment({
      //     calories: req.body.calories,
      //     protein: req.body.protein,
      //     carbohydrates: req.body.carbohydrates,
      //     fat: req.body.fat
      //   },
      //   { transaction },
      //   { where: { UserId }})

      //   return newFood
      // })
      
      // res.status(201).json(result)

    } catch (error) {
      console.log(error);
      // await t.rollback()
      // res.send(error) // ingat hapus boss
    
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
    
      next({
        name: errorName,
        msg: listOfErrors,
        code: errorCode
      })
    }
  }
}

module.exports = fitnessController