import { NewspostsRepository } from '../repositories/NewspostsRepository';
import { UsersRepository } from '../repositories/UsersRepository';

export class NewspostsService {
    constructor(
        private newspostsRepository: NewspostsRepository,
        private usersRepository: UsersRepository,
    ) {}

    async create(data: { header: string; text: string; authorId: number }) {
        const user = await this.usersRepository.findById(data.authorId);

        if (!user) {
            throw new Error('Author not found');
        }

        const item = await this.newspostsRepository.create({
            header: data.header,
            text: data.text,
            author: user,
        });

        return {
            id: item.id,
            title: item.header,
            text: item.text,
            createDate: item.createDate,
            authorEmail: item.author.email,
        };
    }

    async getById(id: number) {
        const item = await this.newspostsRepository.getById(id);

        if (!item) {
            return null;
        }

        return {
            id: item.id,
            title: item.header,
            text: item.text,
            createDate: item.createDate,
            authorEmail: item.author.email,
        };
    }

    async getAll(page: number, size: number) {
        const result = await this.newspostsRepository.getAll(page, size);

        return {
            ...result,
            items: result.items.map((item) => ({
                id: item.id,
                title: item.header,
                text: item.text,
                createDate: item.createDate,
                authorEmail: item.author.email,
            })),
        };
    }

    async update(id: number, data: { header?: string; text?: string }) {
        const item = await this.newspostsRepository.update(id, {
            ...(data.header !== undefined ? { header: data.header } : {}),
            ...(data.text !== undefined ? { text: data.text } : {}),
        });

        if (!item) {
            return null;
        }

        return {
            id: item.id,
            header: item.header,
            text: item.text,
            createDate: item.createDate,
            authorEmail: item.author.email,
        };
    }

    async delete(id: number) {
        return this.newspostsRepository.delete(id);
    }
}