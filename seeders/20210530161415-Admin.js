'use strict';
const { encryptPassword } = require('../helper/cryptografi')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dataUserAdmin = [
      {
        email: 'admin@mail.com',
        password: encryptPassword('1234567'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Users', dataUserAdmin, {})

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
