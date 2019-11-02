import Koa from 'koa';
import logger from '../lib/logger';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import path from 'path';
import cors from '@koa/cors';
import passport from 'koa-passport';
import LocalStrategy from 'passport-local';

import passportJwt from 'passport-jwt';

import exceptionLogger from '../lib/exception-logger';
import requestLogger from '../lib/request-logger';
import config from '../config/config';
import {receiveOrdersRoutes, receiveOrdersAllowedMethods} from './receive-orders/router';
import socket from './receive-orders/socket'

const publicPath = path.join(__dirname, '../public');

const jwtSecret = config.jwtSecret;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

import model from '../model';

const app = new Koa();
const server = require('http').createServer(app.callback());

const io = require('socket.io')(server);

app.use(cors());
app.use(passport.initialize());
app.use(exceptionLogger);
app.use(requestLogger);
app.use(bodyParser());
app.use(koaStatic(publicPath));

app.use(receiveOrdersRoutes());
app.use(receiveOrdersAllowedMethods());

passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        session: false
    },
    async function(login, password, done) {
        const user = await model.User.findOne({ where: { login } });

        if (!user || !user.checkPassword(password)) {
            return done(null, false, { message: 'User does not exist or wrong password.' });
        }

        return done(null, user);
    })
);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: jwtSecret
};

passport.use(new JwtStrategy(jwtOptions, async function(payload, done) {
    const user = await model.User.findByPk(payload.id);
    if (user) {
        done(null, user)
    } else {
        done(null, false)
    }
}));

io.on('connection', socket.controller);

const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`;

server.listen(PORT, () => {
    logger.info(`App started on ${url}`);
});

export default io;
