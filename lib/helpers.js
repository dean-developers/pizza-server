import model from '../model';

function userSerialize({ id, login, type, status }) {
    return { id, login, type, status };
}

async function calculateOrder(pizzas) {
    const result = [];

    const itemsSum = function(items, prop) {
        return items.reduce(function(a, b) {
            return Number.parseInt(a) + Number.parseInt(b[prop]);
        }, 0);
    };

    for (const order of pizzas) {
        let sum = 0;
        let weight_ = 0;
        const { pizzaId, ingredients } = order;

        const pizza = await model.Pizza.findByPk(pizzaId);

        if (pizza) {
            const { price, weight } = pizza;

            sum += Number.parseInt(price);
            weight_ += Number.parseInt(weight);
        }

        const ingredient = await model.Ingredient.findAll({
            where: {
                id: { [model.Sequelize.Op.in]: ingredients }
            }
        });

        sum += itemsSum(ingredient, 'price');
        weight_ += itemsSum(ingredient, 'weight');

        result.push({
            pizzaId,
            sum,
            weight: weight_,
            additionalIngredients: ingredient.map('name')
        });
    }

    return result;
}

module.exports = {
    userSerialize,
    calculateOrder
};
