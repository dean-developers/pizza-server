module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Pizzas', [{
            name: 'Cukier z cynamonem',
            price: '129',
            size: '30',
            weight: '430',
            ingredients: ['cukier', 'cynamon']
        }, {
            name: 'Cukier puder',
            price: '167',
            size: '30',
            weight: '580',
            ingredients: ['cukier puder']
        }, {
            name: 'Lukier malina z marakują',
            price: '117',
            size: '30',
            weight: '390',
            ingredients: ['pulpa malinowa', 'pulpa marakuja', 'cukier puder']
        }, {
            name: 'Biała czekolada z borówkami',
            price: '99',
            size: '30',
            weight: '400',
            ingredients: ['biała czekolada', 'suszone borówki']
        }, {
            name: 'Kit kat z masłem orzechowym',
            price: '114',
            size: '30',
            weight: '405',
            ingredients: ['mleczna czekolada', 'masło orzechowe', 'kruszone wafelki', 'kulki czekoladowe', 'batonik Kit Kat']
        }, {
            name: 'Lion kokosowy',
            price: '132',
            size: '30',
            weight: '460',
            ingredients: ['biała czekolada z kokosem', 'płatki śniadaniowe Lion', 'karmel kokosowy', 'batonik Lion']
        }, {
            name: 'Dakłas',
            price: '127',
            size: '30',
            weight: '390',
            ingredients: ['krem śmietankowy z mascarpone', 'orzechy włoskie', 'daktyle', 'beziki', 'kakao']
        }, {
            name: 'Cini Minis',
            price: '127',
            size: '30',
            weight: '390',
            ingredients: ['cynamonowa czekolada', 'płatki śniadaniowe Cini Minies']
        }, {
            name: 'Kinder Mleczna Kanapka',
            price: '127',
            size: '30',
            weight: '390',
            ingredients: ['krem na bazie mascarpone', 'miodowa polewa', 'kakaowe ciasto biszkoptowe']
        }, {
            name: 'Beza Pavlova',
            price: '127',
            size: '30',
            weight: '390',
            ingredients: ['krem na bazie mascarpone', 'lukier', 'brzoskwinia', 'borówka', 'truskawka', 'bezy']
        }].map(it => Object.assign(it, {
            createdAt: new Date(),
            updatedAt: new Date()
        })));
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Pizzas', {
            name: {
                [Sequelize.Op.in]: [
                    'Cukier z cynamonem',
                    'Cukier puder',
                    'Lukier malina z marakują',
                    'Biała czekolada z borówkami',
                    'Kit kat z masłem orzechowym',
                    'Lion kokosowy',
                    'Dakłas',
                    'Cini Minis',
                    'Kinder Mleczna Kanapka',
                    'Beza Pavlova'
                ]
            }
        });
    }
};
