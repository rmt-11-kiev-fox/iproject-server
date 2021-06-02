'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('BidLists', {
      type: 'FOREIGN KEY',
      name: 'fk_bidlists_user_id',
      fields: ['user_id'],
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('BidLists', 'fk_bidlists_user_id')
  }
};