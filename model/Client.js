module.exports = function(sequelize, DataTypes) {
    const Client = sequelize.define('Client', {
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING
        }
    });

    Client.associate = function(models) {
    };

    return Client;
};
