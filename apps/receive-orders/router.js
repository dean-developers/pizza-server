import Router from 'koa-router';

import Address from './controllers/address';
import Auth from '../middleware/auth';
import User from './controllers/user';
import Pizza from './controllers/pizza';
import Order from './controllers/order';

const router = new Router();

router.get('/', async (ctx) => {
    await ctx.render('index.html');
});

router.get('/user', Auth.checkToken, User.getUser);
router.post('/user/create', Auth.checkToken, User.create);
router.post('/login', Auth.getToken);
router.get('/users', Auth.checkToken, User.getUsers);

router.get('/address', Address.normalize);
router.get('/cities', Auth.checkToken, Address.cities);

router.get('/pizzas', Auth.checkToken, Pizza.pizzas);
router.get('/pizza/:id', Auth.checkToken, Pizza.getPizzaById);
router.post('/pizza', Auth.checkToken, Pizza.create);
router.put('/pizza/:id', Auth.checkToken, Pizza.change);
router.delete('/pizza/:id', Auth.checkToken, Pizza.deletePizza);
router.get('/ingredients', Auth.checkToken, Pizza.ingredients);
router.post('/order/calculate', Auth.checkToken, Order.calculate);
router.delete('/order/:id', Auth.checkToken, Order.delete_);

export function receiveOrdersRoutes() {
    return router.routes()
}

export function receiveOrdersAllowedMethods() {
    return router.allowedMethods()
}
