module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM,
            values: ['operator', 'admin', 'boss'],
            allowNull: false
        }
    });

    User.associate = function(models) {
    };

    return User;
};
