import { Router } from 'express';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, (req: any, res) => {
    res.json({
        email: req.user.email,
        id: req.user.id,
    });
});

export default router;