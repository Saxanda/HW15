import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDir = path.join(__dirname, '..', '..', 'logs');

const dailyTransport = new DailyRotateFile({
    dirname: logDir,
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxFiles: '14d',
});

const errorTransport = new winston.transports.File({
    dirname: logDir,
    filename: 'error.log',
    level: 'error',
    maxsize: 1024 * 1024,
    maxFiles: 10,
});

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.Console(),
        dailyTransport,
        errorTransport,
    ],
});