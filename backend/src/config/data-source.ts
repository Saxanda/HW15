import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Newspost } from '../entities/NewsPost';
import { UpdatePostsAndUsers1713610000000 } from '../migrations/1713610000000-UpdatePostsAndUsers';

console.log({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
});

const isRender = Boolean(process.env.DATABASE_URL);
const AppDataSource = new DataSource({
    type: 'postgres',

    ...(isRender
        ? {
            url: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        }
        : {
            host: process.env.PGHOST || '127.0.0.1',
            port: Number(process.env.PGPORT || 5432),
            username: process.env.PGUSER || 'postgres',
            password: process.env.PGPASSWORD || 'postgres',
            database: process.env.PGDATABASE || 'homework15',
        }),

    entities: [User, Newspost],
    migrations: [UpdatePostsAndUsers1713610000000],
    synchronize: false,
    logging: true,
});

export default AppDataSource;


