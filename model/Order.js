module.exports = function(sequelize, DataTypes) {
    const Order = sequelize.define('Order', {
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['success', 'processing', 'cancelled']
        }
    });

    Order.associate = function(models) {
        Order.belongsTo(models.Client, {
            as: 'client', foreignKey: 'clientId'
        });
    };

    return Order;
};
