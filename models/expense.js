'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Expense.init({
    category: {
      allowNull: false,
      validate: {
        notEmpty: { msg: `Please select the category!` },
        isIn: {
          args: [['Food', 'Transport', 'Bills', 'Entertainment', 'Health', 'Shopping', 'Others']],
          msg: `Invalid category!`
        },
      },
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      validate: {
        notEmpty: { msg: `Please fill in the description!` }
      },
      type: DataTypes.STRING
    },
    amount: {
      allowNull: false,
      validate: {
        notEmpty: { msg: `Please enter the amount!` }
      },
      type: DataTypes.INTEGER
    },
    period: {
      allowNull: false,
      validate: {
        notEmpty: { msg: `Please enter the period!` }
      },
      type: DataTypes.STRING
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};