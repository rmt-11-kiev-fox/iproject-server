'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      currentWeight: {
        type: Sequelize.INTEGER
      },
      calories: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      protein: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      carbohydrates: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fat: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {  
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      uniqueKeys: {
        unique_tag: {
          customIndex: true,
          fields: ['UserId', 'date']
        }
      }
    }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserData');
  }
};