require('sugar')();

import helpers from '../../../lib/helpers';
import model from '../../../model';

const calculate = async (ctx) => {
    const { pizzas } = ctx.request.body;

    if (!pizzas) {
        ctx.throw(400, 'badRequest');
    }

    ctx.body = await helpers.calculateOrder(pizzas);
};

const remove = async (ctx) => {
    const { id: orderId } = ctx.params;

    if (!orderId) {
        ctx.throw(400, 'badRequest');
    }

    const pizzaOrder = await model.PizzaOrder.findAll({
        where: {
            orderId
        }
    });

    if (!pizzaOrder.length) {
        ctx.throw(404, 'orderNotFound');
    }

    await model.PizzaOrder.destroy({
        where: {
            id: { [model.Sequelize.Op.in]: pizzaOrder.map('id') }
        }
    });

    ctx.body = pizzaOrder;
};

module.exports = {
    calculate,
    remove
};
