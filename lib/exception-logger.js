const logger = require('./logger');

module.exports = async function(ctx, next) {
    try {
        await next();
    } catch (err) {
        logger.error(err);
        ctx.status = err.status || 500;
        ctx.body = {
            code: ctx.status,
            message: err.message.trim()
        };
        logger.error(`[${ctx.method}] ${ctx.originalUrl} ${ctx.status}: ${err.message}\n ${err.stack}\n`);
        ctx.app.emit('error', err, ctx);
    }
};
