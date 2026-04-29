import 'reflect-metadata';
import path from 'path';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';

import AppDataSource from './config/data-source';
import { NewspostsRepository } from './repositories/NewspostsRepository';
import { UsersRepository } from './repositories/UsersRepository';
import { NewspostsService } from './services/NewspostsService';
import newspostsRouter from './routers/newsposts.router';

import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';

import passport from './config/passport';
import authRouter from './routers/auth.router';
import userRouter from './routers/user.router';

dotenv.config();

const app = express();

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT) || 8000;

const newspostsRepository = new NewspostsRepository();
const usersRepository = new UsersRepository();
const newspostsService = new NewspostsService(
    newspostsRepository,
    usersRepository
);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(requestLogger);

// public
app.use('/auth', authRouter);

// protected
app.use('/users', userRouter);
app.use('/api/posts', newspostsRouter(newspostsService));

app.use(errorHandler);

const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

app.use((_req: Request, res: Response) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, HOST, () => {
            console.log(`Server running at http://${HOST}:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database init error:', error);
    });