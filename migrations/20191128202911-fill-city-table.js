module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Cities', [{
            code: 'vin',
            name: 'Vinnytsia'
        }].map(it => Object.assign(it, {
            createdAt: new Date(),
            updatedAt: new Date()
        })));
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Cities', {
            code: {
                [Sequelize.Op.in]: [
                    'vin'
                ]
            }
        })
    }
};
