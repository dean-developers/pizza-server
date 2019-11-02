import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import helpers from '../../lib/helpers';

const jwtSecret = config.jwtSecret;

const checkToken = async (ctx, next) => {
    await passport.authenticate('jwt', async function(err, user) {
        if (user) {
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
                jwt: jwt.sign(payload, jwtSecret)
            };
        }
    })(ctx, next);
};

module.exports = {
    checkToken,
    getToken
};
