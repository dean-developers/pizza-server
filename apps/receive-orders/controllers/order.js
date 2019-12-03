require('sugar')();

import model from '../../../model';
import helpers from '../../../lib/helpers';


const calculate = async (ctx) => {
    const { pizzas } = ctx.request.body;

    if (!pizzas) {
        ctx.throw(400, 'badRequest');
    }

    ctx.body = await helpers.calculateOrder(pizzas);
};

module.exports = {
    calculate
};
