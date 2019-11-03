import model from '../../../model';
import helpers from '../../../lib/helpers';

const getUser = async (ctx) => {
    ctx.body = helpers.userSerialize(ctx.user);
};

const create = async (ctx) => {
    const { login, password, type } = ctx.request.body;

    if (!login || !password || !type) {
        ctx.throw(400, 'badRequest');
    }

    const checkUser = await model.User.findOne({
        where: {
            login
        }
    });

    if (checkUser) {
        ctx.throw(409, 'loginAlreadyExist')
    }

    const user = await model.User.createUser({ login, password, type });

    ctx.body = helpers.userSerialize(user);
};

module.exports = {
    getUser,
    create
};
