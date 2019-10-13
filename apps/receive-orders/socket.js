import logger from '../../lib/logger';
import io from '../index';
import model from '../../model';

export default {
    controller: socket => {
        logger.info(`Connection: ${socket.id}`);

        socket.on('disconnect', socket => {
            logger.info(`Disconnected: ${socket.id}`)
        });

        socket.on('order', async (data) => {
            logger.info(`Order: ${JSON.stringify(data)}`);

            const { phone, name, surname } = data;

            const [client, created] = await model.Client.findOrCreate({
                where: {
                    phone
                },
                defaults: {
                    phone, name, surname
                }
            });

            if (client) {
                await model.Order.create({
                    clientId: client.id,
                    status: 'processing'
                });
            }

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

            io.emit('received', orders);
        });
    }
};


