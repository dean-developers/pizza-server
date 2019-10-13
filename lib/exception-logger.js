const logger = require('./logger');

module.exports = async function(ctx, next) {
    try {
        await next();
    } catch (e) {
        logger.error(e);
        ctx.status = e.status || 500;
        ctx.body = e.message;
        ctx.app.emit('error', e, ctx);
    }
};
