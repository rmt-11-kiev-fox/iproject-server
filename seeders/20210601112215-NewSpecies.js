'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dataNewSpecies = [
      {
        name: 'Orcaella brevirostris',
        img_url: "https://upload.wikimedia.org/wikipedia/id/thumb/9/98/Pesut_2.jpg/330px-Pesut_2.jpg",
        kingdom: "Animalia",
        habitat: "Air tawar",
        region: "ID-id",
        status: "EN",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('NewSpecies', dataNewSpecies, {})

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('NewSpecies', null, {});
  }
};
