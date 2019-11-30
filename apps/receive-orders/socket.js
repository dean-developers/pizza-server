import logger from '../../lib/logger';
import io from '../index';
import model from '../../model';

export default {
    controller: socket => {

        socket.on('disconnect', async function() {
            const session = await model.SocketSession.findOne({
                where: {
                    sessionId: socket.id
                },
                include: {
                    model: model.User,
                    as: 'user',
                    required: true
                }
            });

            if (session && session.user) {
                await session.user.update({ status: 'offline' });
                await session.destroy();
            }
            logger.info(`[DISCONNECT SOCKET ID]: ${socket.id}`);
        });

        socket.on('login', async (data) => {
            logger.info(`[CONNECT SOCKET ID]: ${socket.id}`);
            const { id } = data;

            const user = await model.User.findByPk(id);
            if (user) {
                await user.update({
                    status: 'online'
                });

                await model.SocketSession.create({ sessionId: socket.id, userId: user.id });
            }
        });

        socket.on('order', async (data) => {
            logger.info(`[ORDER]: ${JSON.stringify(data)}`);

            const { cityName, phone, name, surname, street, houseNumber } = data;

            if (!phone || !cityName || !name || !surname) {
                io.emit('error', { status: '400', description: 'badRequest' });
                return;
            }

            const city = await model.City.findOne({
                where: {
                    name: cityName
                }
            });

            if (!city) {
                logger.error(`City '${city}' not found`);
                io.emit('error', { status: '404', description: 'cityNotFound' });
                return;
            }

            const [client, created] = await model.Client.findOrCreate({
                where: {
                    phone
                },
                defaults: {
                    phone, name, surname
                }
            });

            if (client) {
                io.emit('order', await model.Order.create({
                    clientId: client.id,
                    cityId: city.id,
                    street,
                    houseNumber,
                    status: 'processing'
                }));
            }
        });

        socket.on('received', async function() {
            logger.info('[EMIT] received');
            const orders = await model.Order.findAll({
                where: {
                    status: 'processing'
                },
                include: {
                    model: model.Client,
                    as: 'client',
                    required: true
                }
            });

            io.emit('orders', orders);
        });
    }
};


