import { Router } from 'express';
import { AuthService } from '../services/AuthService';

const router = Router();
const authService = new AuthService();

router.post('/register', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        const result = await authService.register(
            email,
            password,
            confirmPassword
        );

        res.json(result);
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        res.json(result);
    } catch (e: any) {
        res.status(401).json({ message: e.message });
    }
});

export default router;