'use strict';
const axios = require('axios');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // call axios to get symptoms data
    axios({
      method: 'GET',
      url: `https://healthservice.priaid.ch/symptoms?token=${process.env.API_MEDIC_AUTH_TOKEN}&format=json&language=en-gb`
    })
      .then((response) => {
        
      })
      .catch((error) => {
        console.log(error);
      })
    // let data = '';
    // await queryInterface.bulkInsert('Symptoms', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Symptoms', null, {});
  }
};
