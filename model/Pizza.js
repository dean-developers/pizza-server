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
        }
    }, {});
    Pizza.associate = function(models) {
    };

    return Pizza;
};
