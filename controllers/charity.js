const axios = require('axios')
const userKey = process.env.USER_KEY

module.exports = class Controller {
	static async listCategories(req, res, next) {
		try {
			const categories = await axios({
				method: 'GET',
				url: `http://data.orghunter.com/v1/categories?user_key=${userKey}`
			})
			res.status(200).json(categories.data)
		} catch (err) {
			next(err)
		}
	}

	static async organizationByCategory(req, res, next) {
		const id = req.params.id
		try {
			const organizations = await axios({
				method: 'GET',
				url: `http://data.orghunter.com/v1/charitysearch?user_key=${userKey}&category=${id}&rows=20`
			})
			res.status(200).json(organizations.data)
		} catch (err) {
			next(err)
		}
	}

	static async organizationById(req, res, next) {
		const id = req.params.id
		
		try {
			const organizations = await axios({
				method: 'GET',
				url: `http://data.orghunter.com/v1/charitysearch?user_key=${userKey}&ein=${id}`
			})
			const organizationData = organizations.data.data[0]
			res.status(200).json(organizationData)

		} catch (err) {
			next(err)
		}

	}

	static async searchOrganizations(req, res, next) {
		const keyword = encodeURIComponent(req.query.keyword)

		try {
			const organizations = await axios({
				url: `http://data.orghunter.com/v1/charitysearch?user_key=${userKey}&searchTerm=${keyword}&rows=20`,
				method: 'GET'
			})
			const organizationData = organizations.data.data
			res.status(200).json(organizationData)

		} catch (err) {
			next(err)
		}

	}

}