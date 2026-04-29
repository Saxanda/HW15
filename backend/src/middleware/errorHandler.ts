import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../errors/ValidationError';
import { NewspostsServiceError } from '../errors/NewspostsServiceError';
import { logger } from '../logger/logger';

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    const isDev = process.env.NODE_ENV === 'development';

    if (err instanceof ValidationError) {
        logger.warn(err.message, { details: err.details });

        res.status(400).json({
            message: err.message,
            ...(isDev ? { stack: err.stack, details: err.details } : {}),
        });
        return;
    }

    if (err instanceof NewspostsServiceError) {
        logger.error(err.message, { stack: err.stack });

        res.status(500).json({
            message: err.message,
            ...(isDev ? { stack: err.stack } : {}),
        });
        return;
    }

    logger.error(err.message, { stack: err.stack });

    res.status(500).json({
        message: 'Internal server error',
        ...(isDev ? { stack: err.stack } : {}),
    });
}