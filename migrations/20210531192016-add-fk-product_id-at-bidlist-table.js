'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('BidLists', {
      type: 'FOREIGN KEY',
      name: 'fk_bidlists_product_id',
      fields: ['product_id'],
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('BidLists', 'fk_bidlists_product_id')
  }
};