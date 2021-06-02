const router = require('express').Router()
const { createDonation } = require('../controllers/donation')

router.post('/donation', createDonation)

module.exports = router