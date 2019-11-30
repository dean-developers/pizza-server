module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Pizzas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.STRING
            },
            size: {
                type: Sequelize.STRING
            },
            weight: {
                type: Sequelize.STRING
            },
            ingredients: {
                type: Sequelize.ARRAY(Sequelize.STRING)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Pizzas');
    }
};
