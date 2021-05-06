module.exports = function(sequelize, DataTypes) {
    const City = sequelize.define('City', {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        longitude: {
            type: DataTypes.DECIMAL,
            allowNull: true
        }
    });

    City.associate = function(models) {
    };

    return City;
};
