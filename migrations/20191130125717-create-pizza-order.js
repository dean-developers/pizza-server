module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('PizzaOrders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            pizzaId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Pizzas',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            orderId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Orders',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            additionalIngredients: {
                allowNull: false,
                type: Sequelize.JSONB,
                defaultValue: {}
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
        return queryInterface.dropTable('PizzaOrders');
    }
};
