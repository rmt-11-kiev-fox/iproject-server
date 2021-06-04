'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Likes', {
      type: 'FOREIGN KEY',
      name: 'fk_likes_product_id',
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
    await queryInterface.removeConstraint('Likes', 'fk_likes_product_id')
  }
};
