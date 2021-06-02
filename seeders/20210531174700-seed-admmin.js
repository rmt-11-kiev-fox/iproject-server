'use strict';

const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Users', [{
        email: 'admin@mail.com',
        password: bcrypt.hashSync('admin', bcrypt.genSaltSync(8)),
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
