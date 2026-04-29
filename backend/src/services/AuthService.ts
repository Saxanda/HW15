import { UsersRepository } from '../repositories/UsersRepository';
import { hashPassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export class AuthService {
    private usersRepo = new UsersRepository();

    async register(email: string, password: string, confirmPassword: string) {
        if (!email || !password || !confirmPassword) {
            throw new Error('All fields required');
        }

        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const existing = await this.usersRepo.findByEmail(email);
        if (existing) {
            throw new Error('User already exists');
        }

        const user = await this.usersRepo.create({
            email,
            password: hashPassword(password),
        });

        return {
            token: generateToken(user.email),
        };
    }

    async login(email: string, password: string) {
        const user = await this.usersRepo.findByEmail(email);

        if (!user || user.password !== hashPassword(password)) {
            throw new Error('Invalid credentials');
        }

        return {
            token: generateToken(user.email),
        };
    }
}