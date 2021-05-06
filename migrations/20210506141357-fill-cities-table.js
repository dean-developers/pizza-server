module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Cities', [{
            code: 'war',
            name: 'Warsaw',
            latitude: 52.232361,
            longitude: 21.002769
        }, {
            code: 'wro',
            name: 'Wrocław',
            latitude: 51.107883,
            longitude: 17.038538
        }, {
            code: 'poz',
            name: 'Poznań',
            latitude: 52.232361,
            longitude: 21.002769
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
