import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    passport.authenticate(
        'jwt',
        { session: false },
        (err: unknown, user: any) => {
            if (err || !user) {
                return res.status(401).json({
                    message: 'Request is unauthorized',
                });
            }

            req.user = user;
            next();
        },
    )(req, res, next);
};