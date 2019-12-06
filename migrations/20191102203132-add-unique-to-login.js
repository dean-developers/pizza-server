module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('Users', ['login'], {
            type: 'unique',
            name: 'login_unique_constraint'
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint('Users', 'login_unique_constraint')
    }
};
