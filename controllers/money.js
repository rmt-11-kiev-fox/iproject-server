const { Income, Expense, Report } = require('../models')

class MoneyController {

  static async addIncome (req, res, next) {
    const { category, description, amount, period } = req.body
    const UserId = +req.currentUser.id

    try {
      if (amount < 1) {
        throw ({ status: 400, message: `Amount can't be zero or less than zero!` })
      } else {
        const income = await Income.create({ category, description, amount, period, UserId })
        const foundReport = await Report.findOne({ where: { UserId, period } })
        const money = new Number(income.amount).toLocaleString("id-ID")

        if (!foundReport) {
          const report = await Report.create({
            UserId,
            total_income: income.amount,
            period: income.period
          })
        } else {
          const newIncome = foundReport.total_income + income.amount
          const report = await Report.update({
            total_income: newIncome
          }, {
            where: { id: +foundReport.id, UserId }
          })
        }
        res.status(201).json({
          message: `New income Rp ${money},- from ${income.category} - ${income.description} has been added successfully!`
        })
      }
    } catch (err) {
      next(err)
    }
  }

  static async addExpense (req, res, next) {
    const { category, description, amount, period } = req.body
    const UserId = +req.currentUser.id

    try {
      const foundReport = await Report.findOne({ where: { UserId, period: period } })
      
      if (!foundReport) {
        throw ({ status: 400, message: `Please input your income first!` })
      } else {
        if (foundReport.total_income < amount) {
          throw ({ status: 400, message: `Your expense shouldn't be higher than your income!` })
        } else {
          const expense = await Expense.create({ category, description, amount, period, UserId })
          const money = new Number(expense.amount).toLocaleString("id-ID")
          let current_balance = 0

          if (!foundReport.total_expenses) {
            current_balance = foundReport.total_income - amount
            const report = await Report.update({
              total_expenses: expense.amount,
              balance: current_balance
            }, {
              where: { id: +foundReport.id, UserId }
            })
          } else {
            const newExpense = foundReport.total_expenses + expense.amount
            current_balance = foundReport.total_income - newExpense
            const report = await Report.update({
              total_expenses: newExpense,
              balance: current_balance
            }, {
              where: { id: +foundReport.id, UserId }
            })
          }
          res.status(201).json({
            message: `New expense Rp ${money},- from ${expense.category} - ${expense.description} has been added successfully!`
          })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async showMonthlyIncomes (req, res, next) {
    const { period } = req.body
    try {
      const monthlyIncomes = await Income.findAll({ where: { period }, order: [['createdAt', 'ASC']] })
      if (!monthlyIncomes) {
        throw ({ status: 404, message: `You haven't submit any Income for this period!` })
      } else {
        res.status(200).json(monthlyIncomes)
      }
    } catch (err) {
      next(err)
    }
  }

  static async showMonthlyExpenses (req, res, next) {
    const { period } = req.body
    try {
      const monthlyExpenses = await Expense.findAll({ where: { period }, order: [['createdAt', 'ASC']] })
      if (!monthlyExpenses) {
        throw ({ status: 404, message: `You haven't submit any Expenses for this period!` })
      } else {
        res.status(200).json(monthlyExpenses)
      }
    } catch (err) {
      next(err)
    }
  }

  static async showReports (req, res, next) {
    const { period } = req.body
    const UserId = +req.currentUser.id
    try {
      const showReports = await Report.findOne({ where: { UserId, period } })
      res.status(200).json(showReports)
    } catch (err) {
      next(err)
    }
  }

  static async editIncome (req, res, next) {
    const UserId = +req.currentUser.id
    const id = +req.params.id
    const { category, description } = req.body
    try {
      const editIncome = await Income.update({ category, description }, { where: { id, UserId } })
      res.status(200).json({ message: `Category and Description successfully changed!` })
    } catch (err) {
      next(err)
    }
  }

  static async updateIncome (req, res, next) {
    const UserId = +req.currentUser.id
    const id = +req.params.id
    const { amount } = req.body
    try {
      const beforeUpdate = await Income.findByPk(id)
      const currentAmount = beforeUpdate.amount
      const updateIncome = await Income.update({ amount }, { where: { id, UserId }, returning: true })
      const updatedAmount = updateIncome[1][0].amount
      const period = updateIncome[1][0].period
      const foundReport = await Report.findOne({ where: { UserId, period } })
      const updatedIncome = foundReport.total_income - currentAmount + updatedAmount
      const updatedBalance = updatedIncome - foundReport.total_expenses
      const updatedReport = await Report.update({ total_income: updatedIncome, balance: updatedBalance }, { where: { UserId, period }, returning: true })
      res.status(200).json({ message: `Income amount successfully updated!` })
    } catch (err) {
      next(err)
    }
  }

  static async deleteIncome (req, res, next) {
    const UserId = +req.currentUser.id
    const id = +req.params.id
    try {
      const beforeDelete = await Income.findByPk(id)
      const period = beforeDelete.period
      const currentAmount = beforeDelete.amount
      const deleteIncome = await Income.destroy({ where: { id } })
      const foundReport = await Report.findOne({ where: { UserId, period } })
      const updatedIncome = foundReport.total_income - currentAmount
      const updatedBalance = updatedIncome - foundReport.total_expenses
      const updatedReport = await Report.update({ total_income: updatedIncome, balance: updatedBalance }, { where: { UserId, period }, returning: true })
      res.status(200).json({ message: `Successfully deleted!` })
    } catch (err) {
      next(err)
    }
  }

  static async editExpenses (req, res, next) {
    const UserId = +req.currentUser.id
    const id = +req.params.id
    const { category, description } = req.body
    try {
      const editExpenses = await Expense.update({ category, description }, { where: { id, UserId } })
      res.status(200).json({ message: `Category and Description successfully changed!` })
    } catch (err) {
      next(err)
    }
  }

  static async updateExpenses (req, res, next) {
    const UserId = +req.currentUser.id
    const id = +req.params.id
    const { amount } = req.body
    try {
      const beforeUpdate = await Expense.findByPk(id)
      const currentAmount = beforeUpdate.amount
      const updateExpenses = await Expense.update({ amount }, { where: { id, UserId }, returning: true })
      const updatedAmount = updateExpenses[1][0].amount
      const period = updateExpenses[1][0].period
      const foundReport = await Report.findOne({ where: { UserId, period } })
      const updatedExpenses = foundReport.total_expenses - currentAmount + updatedAmount
      const updatedBalance = foundReport.total_income - updatedExpenses
      const updatedReport = await Report.update({ total_expenses: updatedExpenses, balance: updatedBalance }, { where: { UserId, period }, returning: true })
      res.status(200).json({ message: `Expenses amount successfully updated!` })
    } catch (err) {
      next(err)
    }
  }

  static async deleteExpenses (req, res, next) {
    const UserId = +req.currentUser.id
    const id = +req.params.id
    try {
      const beforeDelete = await Expense.findByPk(id)
      const period = beforeDelete.period
      const currentAmount = beforeDelete.amount
      const deleteIncome = await Expense.destroy({ where: { id } })
      const foundReport = await Report.findOne({ where: { UserId, period } })
      const updatedExpenses = foundReport.total_expenses - currentAmount
      const updatedBalance = foundReport.total_income - updatedExpenses
      const updatedReport = await Report.update({ total_expenses: updatedExpenses, balance: updatedBalance }, { where: { UserId, period }, returning: true })
      res.status(200).json({ message: `Successfully deleted!` })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = MoneyController