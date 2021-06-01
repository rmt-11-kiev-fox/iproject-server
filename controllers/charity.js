const axios = require('axios')
const userKey = process.env.USER_KEY

module.exports = class Controller {
	static async listCharities(req, res, next) {

		axios({
			method: 'GET',
			url: `http://data.orghunter.com/v1/charitysearch?user_key=${userKey}`
		})
			.then(({ data }) => {
				res.status(200).json(data)
			}).catch(err => {
				console.log(err);
			})
	}

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
				url: `http://data.orghunter.com/v1/charitysearch?user_key=${userKey}&category=${id}&rows=40`
			})
			res.status(200).json(organizations.data)
		} catch (err) {
			next(err)
		}
	}

	static async searchOrganizations(req, res, next) {
		const keyword = encodeURIComponent(req.query.keyword)

		try {
			const organizations = await axios({
				url: `http://data.orghunter.com/v1/charitysearch?user_key=${userKey}&searchTerm=${keyword}&rows=10`,
				method: 'GET'
			})
			const organizationData = organizations.data.data
			res.status(200).json(organizationData)

		} catch (err) {
			next(err)
		}

	}

	static async payment(req, res, next) {
		axios({
			method: "POST",
			url: `https://api.stripe.com/v1/payment_methods`
		})

	}
}