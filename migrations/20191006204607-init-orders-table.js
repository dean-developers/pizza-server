module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Orders', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            clientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Clients',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            status: {
                type: Sequelize.ENUM,
                values: ['success', 'processing', 'cancelled']
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
        return queryInterface.dropTable('Orders');
    }
};
