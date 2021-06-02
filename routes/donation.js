const router = require('express').Router()
const { createDonation, listDonation } = require('../controllers/donation')

router.post('/donation', createDonation)
router.get('/donation', listDonation)

module.exports = router