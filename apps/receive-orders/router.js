import Router from 'koa-router';

import Address from './controllers/address';
import Auth from '../middleware/auth';
import User from './controllers/user';

const router = new Router();

router.get('/', async (ctx) => {
    await ctx.render('index.html');
});

router.get('/user', Auth.checkToken, User.getUser);
router.post('/user/create', Auth.checkToken, User.create);
router.post('/login', Auth.getToken);

router.get('/address', Address.normalize);

router.get('/users', Auth.checkToken, User.getUsers);

export function receiveOrdersRoutes() {
    return router.routes()
}

export function receiveOrdersAllowedMethods() {
    return router.allowedMethods()
}
