'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Countries', [
      {
        leagueKey: 152,
        countryName: 'England',
        countryKey: 44,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        leagueKey: 302,
        countryName: 'Spain',
        countryKey: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        leagueKey: 168,
        countryName: 'France',
        countryKey: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        leagueKey: 207,
        countryName: 'Italy',
        countryKey: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        leagueKey: 175,
        countryName: 'Germany',
        countryKey: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
