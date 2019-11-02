import logger from '../../lib/logger';
import io from '../index';
import model from '../../model';

export default {
    controller: socket => {
        logger.info(`Connection: ${socket.id}`);
        // console.log('this is the name from the JWT: ' + socket.decoded_token.displayName);

        socket.on('login', async (data) => {
            console.log(data);
            // todo: save to db token
        });

        socket.on('disconnect', socket => {
            logger.info(`Disconnected: ${socket.id}`)
        });

        socket.on('order', async (data) => {
            logger.info(`Order: ${JSON.stringify(data)}`);

            const { cityName, phone, name, surname, street, houseNumber } = data;

            const city = await model.City.findOne({
                where: {
                    name: cityName
                }
            });

            if (!city) {
                io.emit('error', { status: '404', description: 'cityNotFound' });
                return ;
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
                await model.Order.create({
                    clientId: client.id,
                    cityId: city.id,
                    street,
                    houseNumber,
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


