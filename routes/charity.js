const router = require('express').Router()

const { listCategories, organizationByCategory, searchOrganizations, organizationById
} = require('../controllers/charity')

router.get('/categories', listCategories)
router.get('/categories/:id', organizationByCategory)
router.get('/search', searchOrganizations)
router.get('/organization/:id', organizationById)
module.exports = router