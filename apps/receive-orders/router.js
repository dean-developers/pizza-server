import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
    await ctx.render('index.html');
    // ctx.body = {
    //     test: 'test'
    // }
});

export function receiveOrdersRoutes() {
    return router.routes()
}

export function receiveOrdersAllowedMethods() {
    return router.allowedMethods()
}
