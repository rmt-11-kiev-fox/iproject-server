'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Products', {
      type: 'FOREIGN KEY',
      name: 'fk_products_category_id',
      fields: ['category_id'],
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Products', 'fk_products_category_id')
  }
};
