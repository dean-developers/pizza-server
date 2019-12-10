import logger from '../../lib/logger';
import io from '../index';
import model from '../../model';
import helpers from '../../lib/helpers';

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

            const { cityName, phone, name, surname, street, houseNumber, pizzas } = data;

            if (!phone || !cityName || !name || !surname || !pizzas) {
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
                const order = await model.Order.create({
                    clientId: client.id,
                    cityId: city.id,
                    street,
                    houseNumber,
                    status: 'processing'
                });
                const result = await helpers.calculateOrder(pizzas);

                for (const item of result) {
                    const { pizzaId, additionalIngredients, sum, weight } = item;

                    await model.PizzaOrder.create({
                        orderId: order.id,
                        pizzaId,
                        additionalIngredients,
                        sum,
                        weight
                    });
                }

                io.emit('order', await model.PizzaOrder.findAll({
                    where: {
                        orderId: order.id
                    },
                    include: [
                        {
                            model: model.Pizza,
                            as: 'pizza'
                        },
                        {
                            model: model.Order,
                            as: 'order',
                            include: {
                                model: model.Client,
                                as: 'client'
                            }
                        }
                    ]
                }));
            }
        });

        socket.on('received', async function() {
            logger.info('[EMIT] received');
            const orders = await model.PizzaOrder.findAll({
                include: [
                    {
                        model: model.Pizza,
                        as: 'pizza',
                        required: true
                    },
                    {
                        model: model.Order,
                        as: 'order',
                        required: true,
                        where: {
                            status: 'processing'
                        },
                        include: {
                            model: model.Client,
                            as: 'client'
                        }
                    }
                ],
                order: [['orderId', 'DESC']]
            });

            io.emit('orders', orders);
        });
    }
};


