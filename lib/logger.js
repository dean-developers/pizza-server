import winston from 'winston';
import { format } from 'logform';
import 'winston-daily-rotate-file';

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message.trim()}`)
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({ filename: 'logs/error-%DATE%.log', level: 'error' }),
        new winston.transports.DailyRotateFile({ filename: 'logs/combined-%DATE%.log' })
    ]
});

module.exports = logger;
