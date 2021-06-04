const { User } = require('../models')
const { sign } = require('../helpers/jwt')
const { compareSync } = require('../helpers/bcrypt')

class userController {
  static async register (req, res, next) {
    try {
      const newUser = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        birthDate: req.body.birthDate,
        gender: req.body.gender,
        weight: req.body.weight,
        height: req.body.height
      }

      console.log(newUser);

      const createdUser = await User.create(newUser)

      if (createdUser) {
        res.status(201).json({ id: createdUser.id, email: createdUser.email, userName: createdUser.userName })
      }

    } catch (error) {
      let listOfErrors = []
      let errorName = 'ServerError'
      let errorCode = 500

      if (error.name == 'SequelizeUniqueConstraintError') {
        errorName = "SequelizeUniqueConstraintError"
        errorCode = 400

        if (error.errors[0].message == 'userName must be unique') {
          listOfErrors.push(`User Name already exist`)
        }
        else if (error.errors[0].message == 'email must be unique') {
          listOfErrors.push(`Email already exist`)
        }
      }
      else if (error.name == 'SequelizeValidationError') {
        errorName = "SequelizeValidationError"
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

  // static async changeSetting (req, res, next) {
  //   try {
  //     const id = req.params.id

  //     const newData = {
  //       birthDate: req.body.birthDate,
  //       gender: req.body.gender,
  //       weight: req.body.weight,
  //       height: req.body.height
  //     }

  //     const newUserData = await User.update(newData, { where: { id: id }})
  //     res.status(200).json(newUserData)
  //     console.log('--------------------------------', newUserData ,'------------------------------------------');

  //   } catch (error) {
  //     console.log(error);
  //     // res.send(error) // ingat hapus boss
    
  //     let listOfErrors = []
  //     let errorName = 'ServerError'
  //     let errorCode = 500

  //     if (error.name == 'SequelizeUniqueConstraintError') {
  //       errorName = "SequelizeUniqueConstraintError"
  //       errorCode = 400

  //       if (error.errors[0].message == 'userName must be unique') {
  //         listOfErrors.push(`User Name already exist`)
  //       }
  //       else if (error.errors[0].message == 'email must be unique') {
  //         listOfErrors.push(`Email already exist`)
  //       }
  //     }
  //     else if (error.name == 'SequelizeValidationError') {
  //       errorName = "SequelizeValidationError"
  //       listOfErrors.push(error.errors[0].message)
  //       errorCode = 400
  //     }
  //     else {
  //       listOfErrors = error
  //     }

  //     next({
  //       name: errorName,
  //       msg: listOfErrors,
  //       code: errorCode
  //     }) 
  //   }
  // }

  static async login(req, res, next) {
    try {
      const { userName, email, password } = req.body

      const checkedEmail = await User.findOne({ where: { email: email }})
      const checkedUserName = await User.findOne({ where: { userName: userName }})
      let counter = 0
      let checkedUser;

      if (checkedEmail != null) {
        counter++
        checkedUser = checkedEmail
      }
      if (checkedUserName != null) {
        counter++
        checkedUser = checkedUserName
      }

      if (counter == 0) {
        throw { name: `ResourceNotFound`, msg: `User not found`, code: 404 }
      }
      else {
        if (password == '') {
          throw { name: `BadRequest`, msg: `Password must not be empty`, code: 400}
        }
        else {
          if (compareSync(password, checkedUser.password)) {
            const payload = {
              id: checkedUser.id,
              email: checkedUser.email,
              userName: checkedUser.userName
            }

            const access_token = sign(payload)

            res.status(200).json({ access_token: access_token })
          }
          else {
            next({
              name: 'BadRequest',
              msg: `Email/User Name or password is wrong`,
              code: 400
            })
          }
        }
      }

    } catch (error) {
      if (error.name == 'ResourceNotFound' | error.name == 'BadRequest') {
        next({
          name: error.name,
          msg: error.msg,
          code: error.code
        })
      }
      else {
        next({
          name: 'ServerError',
          msg: error,
          code: 500
        })
      }
    }
  }
}

module.exports = userController