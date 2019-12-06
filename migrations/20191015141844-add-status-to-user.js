module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Users', 'status', Sequelize.ENUM('online', 'offline', 'disabled'));
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Users', 'status');
    }
};
