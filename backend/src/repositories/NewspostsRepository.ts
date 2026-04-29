import AppDataSource from '../config/data-source';
import { Newspost } from '../entities/NewsPost';
import { User } from '../entities/User';

export class NewspostsRepository {
    private repo = AppDataSource.getRepository(Newspost);

    async getAll(page: number, size: number) {
        const [items, total] = await this.repo.findAndCount({
            relations: { author: true },
            order: { id: 'ASC' },
            skip: page * size,
            take: size,
        });

        return { items, page, size, total };
    }

    getById(id: number): Promise<Newspost | null> {
        return this.repo.findOne({
            where: { id },
            relations: { author: true },
        });
    }

    async create(data: { header: string; text: string; author: User }) {
        const entity = this.repo.create(data);
        return this.repo.save(entity);
    }

    async update(id: number, data: Partial<Pick<Newspost, 'header' | 'text'>>) {
        const item = await this.repo.findOneBy({ id });

        if (!item) {
            return null;
        }

        Object.assign(item, data);
        return this.repo.save(item);
    }

    async delete(id: number) {
        const item = await this.repo.findOneBy({ id });

        if (!item) {
            return null;
        }

        await this.repo.remove(item);
        return id;
    }
}