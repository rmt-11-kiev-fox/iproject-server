const { Donation } = require('../models')

module.exports = class Controller {

  static async createDonation(req, res, next) {
    const { organizationName, donationAmount } = req.body
    let { paymentType } = req.body
    const userId = req.user.id
    console.log(paymentType);
    if (paymentType === 'month') paymentType = 'Monthly'
    if (paymentType === 'year') paymentType = 'Annual'
    const input = {
      organizationName, amount: donationAmount, UserId: userId, paymentType
    }
    try {
      const newDonation = await Donation.create(input)
      !newDonation && next({ status: 400, msg: 'Bad Request' })
      res.status(201).json(newDonation)
    } catch (err) {
      next(err)
    }
  }

  static async listDonation(req, res, next) {
    const { id } = req.user

    try {
      const donations = await Donation.findAll({ where: { UserId: id } })
      !donations && next({ status: 404, msg: 'Donations Not Found' })
      res.status(201).json(donations)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}