module.exports = function(sequelize, DataTypes) {
    const SocketSession = sequelize.define('SocketSession', {
        sessionId: {
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    SocketSession.associate = function(models) {
        SocketSession.belongsTo(models.User, {
            as: 'user', foreignKey: 'userId'
        });
    };

    return SocketSession;
};
