'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = require('../resources/home.json')
    let input = []
    data.forEach(element => {
      let obj = {
        name: element['Product Name'],
        brand: element['Product Brand'],
        price: element['Product Price'],
        url: element['Product Url'],
        imageUrl: element['Product Image Url'],
        rating: element['Product Rating'],
        countRating: element['Product Reviews Count'],
        createdAt: new Date,
        updatedAt: new Date
      }
      input.push(obj)
    });
    await queryInterface.bulkInsert('Homes', input, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Homes', input, {});
  }
};
