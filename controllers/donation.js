const { Donation } = require('../models')

module.exports = class Controller {

  static async createDonation(req, res, next) {
    const { organizationName, donationAmount } = req.body
    const userId = req.user.id
    const input = {
      organizationName, amount:donationAmount, UserId: userId, paymentType:"One-Time"
    }
    try {
      const newDonation = await Donation.create(input)
      !newDonation && next({ status: 400, msg: 'Bad Request' })
      res.status(201).json(newDonation)
    } catch (err) {
      next(err)
    }
  }
}