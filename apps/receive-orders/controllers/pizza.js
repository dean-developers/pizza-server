import model from '../../../model';

const pizzas = async (ctx) => {
    const pizza = await model.Pizza.findAll();

    ctx.body = {
        pizza
    }
};

const create = async (ctx) => {

};

const change = async (ctx) => {

};

const deletePizza = async (ctx) => {

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
