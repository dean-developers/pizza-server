import Router from 'koa-router';

import Address from './controllers/address';
import Auth from '../middleware/auth';
import User from './controllers/user';
import Pizza from './controllers/pizza';

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

router.get('/pizza', Auth.checkToken, Pizza.pizzas);
router.post('/pizza', Auth.checkToken, Pizza.create);
router.put('/pizza/:id', Auth.checkToken, Pizza.change);
router.delete('/pizza/:id', Auth.checkToken, Pizza.deletePizza);

export function receiveOrdersRoutes() {
    return router.routes()
}

export function receiveOrdersAllowedMethods() {
    return router.allowedMethods()
}
