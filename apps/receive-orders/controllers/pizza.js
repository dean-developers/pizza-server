require('sugar')();

import model from '../../../model';

const pizzas = async (ctx) => {
    const { name } = ctx.request.query;

    ctx.body = await model.Pizza.findAll({
        where: Object.assign({},
            name && {
                name:
                    { [model.Sequelize.Op.iLike]: `%${name}%` }
            })
    });
};

const create = async (ctx) => {
    const { name, price, size, weight, ingredients } = ctx.request.body;

    if (!name || !price || !size || !weight || !ingredients) {
        ctx.throw(400, 'badRequest');
    }

    ctx.body = await model.Pizza.create({
        name,
        price,
        size,
        weight,
        ingredients
    })
};

const change = async (ctx) => {
    const { id } = ctx.params;
    const { name, price, size, weight, ingredients } = ctx.request.body;

    if (!id) {
        ctx.throw(400, 'badRequest');
    }

    const pizza = await model.Pizza.findByPk(id);

    if (!pizza) {
        ctx.throw(404, 'pizzaNotFound');
    }

    let data = Object.assign({}, {
        name, price, size, weight, ingredients
    });

    data = Object.select(data, [...Object.keys(data).filter(it => !!data[it])]);

    await pizza.update(data);

    ctx.body = await pizza.reload();
};

const deletePizza = async (ctx) => {
    const { id } = ctx.params;

    if (!id) {
        ctx.throw(400, 'badRequest');
    }

    const pizza = await model.Pizza.findByPk(id);

    if (!pizza) {
        ctx.throw(404, 'pizzaNotFound');
    }

    await pizza.destroy();

    ctx.body = pizza;
};

const ingredients = async (ctx) => {
    const ingredients = await model.Ingredient.findAll();

    ctx.body = {
        ingredients
    }
};

module.exports = {
    pizzas,
    create,
    change,
    deletePizza,
    ingredients
};
