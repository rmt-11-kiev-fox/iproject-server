'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Income.init({
    category: {
      allowNull: false,
      validate: {
        notEmpty: { msg: `Please select the category!` },
        isIn: {
          args: [['Deposit', 'Salary', 'Savings', 'Others']],
          msg: `Invalid category!`
        }
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
    modelName: 'Income',
  });
  return Income;
};