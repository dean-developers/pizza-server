module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Ingredients', [{
            name: 'Cukier',
            price: '19',
            weight: '50'
        }, {
            name: 'Cynamon',
            price: '19',
            weight: '50'
        }, {
            name: 'Biała czekolada',
            price: '19',
            weight: '50'
        }, {
            name: 'Kruszone wafelki',
            price: '38',
            weight: '50'
        }, {
            name: 'Kulki czekoladowe',
            price: '18',
            weight: '50'
        }, {
            name: 'Batonik Kit Kat',
            price: '10',
            weight: '25'
        }, {
            name: 'Biała czekolada z kokosem',
            price: '18',
            weight: '50'
        }, {
            name: 'Płatki śniadaniowe Lion',
            price: '42',
            weight: '50'
        }, {
            name: 'Karmel kokosowy',
            price: '29',
            weight: '30'
        }, {
            name: 'Batonik Lion',
            price: '29',
            weight: '10'
        }, {
            name: 'Kakao',
            price: '33',
            weight: '20'
        }].map(it => Object.assign(it, {
            createdAt: new Date(),
            updatedAt: new Date()
        })));
    },

    down: (queryInterface, Sequelize) => Promise.resolve()
};
