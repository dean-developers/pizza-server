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
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        sum: {
            type: DataTypes.STRING
        },
        weight: {
            type: DataTypes.STRING
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
