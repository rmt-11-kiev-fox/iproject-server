'use strict'
const { hashPassword } = require('../helpers/bcrypt')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Chat)
        }
    }
    User.init(
        {
            username: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            }
        },
        {
            sequelize,
            modelName: 'User',
            hooks: {
                beforeCreate(user) {
                    user.password = hashPassword(user.password)
                }
            }
        }
    )
    return User
}
