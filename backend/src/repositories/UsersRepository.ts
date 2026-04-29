import AppDataSource from '../config/data-source';
import { User } from '../entities/User';

export class UsersRepository {
    private repo = AppDataSource.getRepository(User);

    getAll(): Promise<User[]> {
        return this.repo.find();
    }

    findByEmail(email: string): Promise<User | null> {
        return this.repo.findOneBy({ email });
    }

    async create(data: { email: string; password: string }) {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }

    findById(id: number): Promise<User | null> {
        return this.repo.findOneBy({ id });
    }
}