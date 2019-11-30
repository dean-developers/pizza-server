module.exports = (sequelize, DataTypes) => {
    const PizzaOrder = sequelize.define('PizzaOrder', {
        pizzaId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        orderId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        additionalIngredients: {
            allowNull: false,
            type: DataTypes.JSONB,
            defaultValue: {}
        },
    }, {});
    PizzaOrder.associate = function(models) {
        PizzaOrder.belongsTo(models.Pizza, {
            as: 'pizza', foreignKey: 'pizzaId'
        });
        PizzaOrder.belongsTo(models.Order, {
            as: 'order', foreignKey: 'orderId'
        });
    };
    return PizzaOrder;
};
