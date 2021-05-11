'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Animal.belongsToMany(models.User, { through: models.FavoriteAnimal, foreignKey: 'AnimalId' })
    }
  };
  Animal.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please Input Animal Name'
        },
        notNull: {
          args: true,
          msg: 'Animal Name is Required'
        }
      }
    },
    description: DataTypes.STRING,
    image_URL: DataTypes.STRING,
    habitat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please Input Habitat'
        },
        notNull: {
          args: true,
          msg: 'Habitat is Required'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please Input Type'
        },
        notNull: {
          args: true,
          msg: 'Type is Required'
        }
      }
    },
    isNocturnal: DataTypes.BOOLEAN,
    isDiurnal: DataTypes.BOOLEAN,
    totalFavorite: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Animal',
  });
  return Animal;
};