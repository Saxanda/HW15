import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import AppDataSource from '../config/data-source';
import { User } from '../entities/User';
import { Newspost } from '../entities/NewsPost';
import { createHash } from 'crypto';

function hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
}

async function seed() {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);
    const postRepository = AppDataSource.getRepository(Newspost);

    let user = await userRepository.findOneBy({ email: 'testuser@yopmail.com' });

    if (!user) {
        user = userRepository.create({
            email: 'testuser@yopmail.com',
            password: hashPassword('qwe123'),
            deleted: false,
        });

        await userRepository.save(user);
    }

    const existingPostsCount = await postRepository.count();

    if (existingPostsCount === 0) {
        const posts: Newspost[] = [];

        for (let i = 0; i < 10; i++) {
            const post = postRepository.create({
                header: faker.lorem.sentence(),
                text: faker.lorem.paragraph(),
                author: user,
                deleted: false,
            });

            posts.push(post);
        }

        await postRepository.save(posts);
    }

    console.log('Seed completed');
    await AppDataSource.destroy();
}

seed().catch(async (error) => {
    console.error('Seed failed:', error);
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
});