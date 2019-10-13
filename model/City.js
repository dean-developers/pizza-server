module.exports = function(sequelize, DataTypes) {
    const City = sequelize.define('City', {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    City.associate = function(models) {
    };

    return City;
};
