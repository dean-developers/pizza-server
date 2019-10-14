import Koa from 'koa';
import logger from '../lib/logger';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import path from 'path';
import cors from '@koa/cors';

import exceptionLogger from '../lib/exception-logger';
import requestLogger from '../lib/request-logger';
import { receiveOrdersRoutes, receiveOrdersAllowedMethods } from './receive-orders/router';
import socket from './receive-orders/socket'

const publicPath = path.join(__dirname, '../public');

const app = new Koa();
const server = require('http').createServer(app.callback());

const io = require('socket.io')(server);

app.use(exceptionLogger);
app.use(requestLogger);
app.use(bodyParser());
app.use(koaStatic(publicPath));
app.use(cors());

app.use(receiveOrdersRoutes());
app.use(receiveOrdersAllowedMethods());

io.on('connection', socket.controller);

const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`;

server.listen(PORT, () => {
    logger.info(`App started on ${url}`);
});

export default io;
