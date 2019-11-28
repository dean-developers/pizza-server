module.exports = (sequelize, DataTypes) => {
    const Pizza = sequelize.define('Pizza', {
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.STRING
        },
        size: {
            type: DataTypes.STRING
        },
        weight: {
            type: DataTypes.STRING
        },
        ingredients: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        additionalIngredients: {
            allowNull: false,
            type: DataTypes.JSONB,
            defaultValue: {}
        }
    }, {});
    Pizza.associate = function(models) {
    };

    return Pizza;
};
