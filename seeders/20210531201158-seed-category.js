'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Categories', [
      {
        name: 'popart',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'realism',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'surealism',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'abstract',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Categories', null, {});
     
  }
};