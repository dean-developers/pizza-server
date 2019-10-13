module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Clients', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            surname: {
                type: Sequelize.STRING
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Clients');
    }
};
