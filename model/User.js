import crypto from 'crypto';

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        salt: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM,
            values: ['operator', 'admin', 'driver'],
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['online', 'offline', 'disabled'],
            defaultValue: 'offline'
        }
    });

    User.associate = function(models) {
    };

    User.createUser = async function(userData) {
        const user = await User.create(userData);

        await user.setPassword(userData.password);
        await user.save();

        return user;
    };

    User.prototype.setPassword = async function(password) {
        const user = this;

        if (password) {
            user.salt = crypto.randomBytes(128).toString('base64');
            user.password = crypto.pbkdf2Sync(password, user.salt, 1, 128, 'sha1')
                .toString('base64');
        }

        await user.save();
    };

    User.prototype.checkPassword = function(password) {
        const user = this;

        if (!password) {
            return false;
        }

        const passwordHash = crypto.pbkdf2Sync(password, user.salt, 1, 128, 'sha1')
            .toString('base64');

        return passwordHash === user.password;
    };

    return User;
};
