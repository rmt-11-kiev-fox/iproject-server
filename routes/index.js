const router = require('express').Router()
const UserController = require('../controllers/user')
const { authentication, authorizationIncome, authorizationExpenses } = require('../middlewares/auth')
const MoneyController = require('../controllers/money')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.post('/incomes', MoneyController.addIncome)
router.get('/incomes', MoneyController.showMonthlyIncomes)
router.post('/expenses', MoneyController.addExpense)
router.get('/expenses', MoneyController.showMonthlyExpenses)
router.get('/reports', MoneyController.showReports)

router.use('/incomes/:id', authorizationIncome)
router.put('/incomes/:id', MoneyController.editIncome)
router.patch('/incomes/:id', MoneyController.updateIncome)
router.delete('/incomes/:id', MoneyController.deleteIncome)

router.use('/expenses/:id', authorizationExpenses)
router.put('/expenses/:id', MoneyController.editExpenses)
router.patch('/expenses/:id', MoneyController.updateExpenses)
router.delete('/expenses/:id', MoneyController.deleteExpenses)

module.exports = router