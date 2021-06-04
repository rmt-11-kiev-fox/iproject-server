const router = require('express').Router()
const UserController = require('../controllers/user')
const { authentication, authorizationIncome, authorizationExpenses } = require('../middlewares/auth')
const MoneyController = require('../controllers/money')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/', MoneyController.getRecommendation)

router.use(authentication)

router.post('/incomes', MoneyController.addIncome)
router.get('/show-incomes/:period', MoneyController.showMonthlyIncomes)
router.post('/expenses', MoneyController.addExpense)
router.get('/show-expenses/:period', MoneyController.showMonthlyExpenses)
router.get('/reports/:period', MoneyController.showReports)

router.use('/incomes/:id', authorizationIncome)
router.get('/incomes/:id', MoneyController.getInc)
router.put('/incomes/:id', MoneyController.editIncome)
router.patch('/incomes/:id', MoneyController.updateIncome)
router.delete('/incomes/:id', MoneyController.deleteIncome)

router.use('/expenses/:id', authorizationExpenses)
router.get('/expenses/:id', MoneyController.getExp)
router.put('/expenses/:id', MoneyController.editExpenses)
router.patch('/expenses/:id', MoneyController.updateExpenses)
router.delete('/expenses/:id', MoneyController.deleteExpenses)

module.exports = router