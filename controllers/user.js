const { User } = require('../models')
const { tokenGenerator } = require('../helpers/jwt')
const { compareHash } = require('../helpers/bcrypt')
module.exports = class Controller {

	static async register(req, res, next) {
		const { firstName, lastName, username, email, phoneNumber, address, password } = req.body
		const input = { firstName, lastName, username, email, phoneNumber, address, password }
		try {
			const newUser = await User.create(input, {
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'password']
				}
			})
			if (!newUser) next({ status: 400, msg: "Bad Request" })
			const userData = (({ password, createdAt, updatedAt, ...key }) => key)(newUser.dataValues)
			res.status(201).json(userData)
		} catch (err) {
			next(err)
		}
	}

	static async login(req, res, next) {
		const { username, password } = req.body
		try {
			const foundUser = await User.findOne({ where: { username } })
			!foundUser && next({ status: 404, msg: "User Not Found" })
			if (compareHash(password, foundUser.password)) {
				const access_token = tokenGenerator(foundUser)
				res.status(200).json({ access_token })
			}
			next({ status: 401, msg: "Invalid Credentials" })
		}
		catch (err) {
			next(err)
		}
	}

	static async getProfile(req, res, next) {
		const id = req.user.id
		try {
			const profile = await User.findByPk(id, { attributes: { exclude: ['password', 'createdAt', 'updatedAt	'] } })
			!profile && next({ status: 404, msg: 'User Not Found' })
			res.status(200).json(profile.dataValues)
		} catch (err) {
			next(err)
		}
	}

	static async updateProfile(req, res, next) {
		const { firstName, lastName, email, phoneNumber, address } = req.body
		const input = { firstName, lastName, email, phoneNumber, address }
		const id = req.user.id
		try {
			const updatedProfile = await User.update(input, { where: { id }, returning: true })
			!updatedProfile && next({ status: 400, msg: 'Bad Request' })
			res.status(200).json(updatedProfile[1][0])
		} catch (err) {
			next(err)
		}

	}


}