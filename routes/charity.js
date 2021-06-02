const router = require('express').Router()

const {
    listCharities, payment, listCategories, organizationByCategory, searchOrganizations
} = require('../controllers/charity')

router.get('/categories', listCategories)
router.get('/charities', listCharities)
router.post('/payment', payment)
router.get('/categories/:id', organizationByCategory)
router.get('/search', searchOrganizations)
// router.get('/organization/:id', )
module.exports = router