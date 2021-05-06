const fields = ['latitude', 'longitude'];

module.exports = {
  up: (queryInterface, Sequelize) => {
    const promises = fields.map(field => {
      queryInterface.addColumn('Cities', field, Sequelize.DECIMAL);
    });

    return Promise.all(promises);
  },

  down: (queryInterface, Sequelize) => {
    const promises = fields.map(field => {
      queryInterface.removeColumn('Cities', field);
    });

    return Promise.all(promises);
  }
};
