module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define('Ingredient', {
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.STRING
        },
        weight: {
            type: DataTypes.STRING
        }
    }, {});
    Ingredient.associate = function(models) {
    };

    return Ingredient;
};
