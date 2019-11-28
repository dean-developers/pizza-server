module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Ingredients', [{
            name: 'Barbecue sauce',
            price: '19',
            weight: '50'
        }, {
            name: 'Zesty sauce',
            price: '19',
            weight: '50'
        }, {
            name: 'Ceasar sauce',
            price: '19',
            weight: '50'
        }, {
            name: 'Ham',
            price: '38',
            weight: '50'
        }, {
            name: 'Mushrooms',
            price: '19',
            weight: '50'
        }, {
            name: 'Tomatoes',
            price: '18',
            weight: '50'
        }, {
            name: 'Onion',
            price: '10',
            weight: '25'
        }, {
            name: 'Corn',
            price: '18',
            weight: '50'
        }, {
            name: 'Olives',
            price: '42',
            weight: '50'
        }, {
            name: 'Pineapple',
            price: '29',
            weight: '50'
        }, {
            name: 'Chicken',
            price: '29',
            weight: '50'
        }, {
            name: 'Salami',
            price: '33',
            weight: '50'
        }].map(it => Object.assign(it, {
            createdAt: new Date(),
            updatedAt: new Date()
        })));
    },

    down: (queryInterface, Sequelize) => {
    }
};
