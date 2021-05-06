module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Cities', [{
            code: 'war',
            name: 'Warsaw'
        }, {
            code: 'wro',
            name: 'Wrocław'
        }, {
            code: 'poz',
            name: 'Poznań'
        }].map(it => Object.assign(it, {
            createdAt: new Date(),
            updatedAt: new Date()
        })));
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Cities', {
            code: {
                [Sequelize.Op.in]: [
                    'war',
                    'wro',
                    'poz'
                ]
            }
        })
    }
};
