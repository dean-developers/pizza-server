import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import helpers from '../../lib/helpers';
import logger from '../../lib/logger';

const jwtSecret = config.jwtSecret;

const checkToken = async (ctx, next) => {
    console.log(JSON.stringify(ctx.headers));
    await passport.authenticate('jwt', async function(err, user) {
        if (user) {
            logger.info(`USER auth id[${user.id}]`);
            ctx.user = user;
            await next();
        } else {
            ctx.throw(401, 'noSuchUser');
        }
    })(ctx, next)
};

const getToken = async (ctx, next) => {
    await passport.authenticate('local', function(err, user) {
        if (user == false) {
            ctx.throw(403, 'loginFailed');
        } else {
            const payload = {
                id: user.id,
                displayName: user.displayName,
                login: user.login
            };

            ctx.body = {
                user: helpers.userSerialize(user),
                jwt: jwt.sign(payload, jwtSecret, { expiresIn: config.expiresIn })
            };
        }
    })(ctx, next);
};

module.exports = {
    checkToken,
    getToken
};
