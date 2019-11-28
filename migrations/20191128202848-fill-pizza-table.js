module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Pizzas', [{
            name: 'Capricciosa',
            price: '129',
            size: '30',
            weight: '430',
            ingredients: ['tomato sauce', 'mozzarella cheese', 'ham', 'fresh mushrooms']
        }, {
            name: 'Cesario',
            price: '167',
            size: '30',
            weight: '580',
            ingredients: ['creamy sauce', 'tomatoes', 'crispy salad', 'parmesan cheese', 'chicken',
                'mozzarella cheese', 'quail eggs']
        }, {
            name: 'Salami',
            price: '117',
            size: '30',
            weight: '390',
            ingredients: ['tomato sauce', 'mozzarella cheese', 'salami']
        }, {
            name: 'Margarita',
            price: '99',
            size: '30',
            weight: '400',
            ingredients: ['tomato sauce', 'mozzarella cheese', 'tomatoes']
        }, {
            name: 'Diabola',
            price: '114',
            size: '30',
            weight: '405',
            ingredients: ['tomato sauce', 'mozzarella cheese', 'chili pepper', 'pepperoni']
        }, {
            name: 'Carbonara',
            price: '132',
            size: '30',
            weight: '460',
            ingredients: ['tomato sauce', 'ham', 'baked egg', 'mozzarella cheese', 'bavarian sausages']
        }, {
            name: 'Prosciutto',
            price: '127',
            size: '30',
            weight: '390',
            ingredients: ['tomato sauce', 'mozzarella cheese', 'ham']
        }].map(it => Object.assign(it, {
            createdAt: new Date(),
            updatedAt: new Date()
        })));
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Pizzas', {
            name: {
                [Sequelize.Op.in]: [
                    'Capricciosa',
                    'Cesario',
                    'Salami',
                    'Margarita',
                    'Diabola',
                    'Carbonara',
                    'Prosciutto'
                ]
            }
        });
    }
};
