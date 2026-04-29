import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/logger';

export function requestLogger(req: Request, _res: Response, next: NextFunction): void {
    logger.info('Incoming request', {
        method: req.method,
        url: req.originalUrl,
        body: req.body,
    });

    next();
}