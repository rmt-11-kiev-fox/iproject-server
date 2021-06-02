const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')
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
			console.log(err);
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
			console.log(err);
			next(err)
		}
	}

	static async googleLogin(req, res, next) {
		const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

		try {
			const ticket = await client.verifyIdToken({
				idToken: req.body.idToken,
				audience: process.env.GOOGLE_CLIENT_ID
			})

			if (ticket) {
				const payload = ticket.payload
				const email = payload.email
				const username = (payload.given_name + payload.family_name).toLowerCase()
				const fName = payload.given_name
				const lName = payload.family_name
				const password = process.env.GOOGLE_PASS
				const data = { email, username, password, fName, lName }

				const userData = await User.findOrCreate({ where: { email }, defaults: data })
				if (userData) {
					const data = userData[0].dataValues
					const access_token = tokenGenerator(data)
					console.log(access_token);
					res.status(200).json({ access_token })
				}
			}
		} catch (err) {
			console.log(err);
			next(err)
		}
	}
}