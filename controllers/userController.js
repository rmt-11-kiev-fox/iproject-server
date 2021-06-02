const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class UserController {
    static async register (request, response, next) {
        try {
            console.log('register hitted')
            let newUser = {
                full_name: request.body.full_name,
                email: request.body.email,
                password: request.body.password
            }
            let createUser = await User.create(newUser)
            if (createUser) {
                response.status(201).json({
                    id: createUser.id,
                    email: createUser.email
                })
            }
        } catch (error) {
            next({code: 400, message: error.message})
        }
    }

    static async login (request, response, next) {
        try {
            console.log('login hitted')
            let user = await User.findOne({where: { email: request.body.email }})
            if (user) {
                if (compare(request.body.password, user.password)) {
                    // WHEN SIGNING ACCESS TOKEN, SIGN ID AND USERNAME AS PAYLOAD
                    let access_token = sign({id: user.id, email: user.email})
                    response.status(200).json({
                        logged_in_as: user.email,
                        access_token: access_token
                    })
                } else {
                    next({code: 400, message:'Usename or password incorrect!'})
                }
            } else {
                next({code: 400, message:'Usename or password incorrect!'})
            }
        } catch (error) {
            next({code: 400, message: error.message})
        }
    }
}

module.exports = UserController;