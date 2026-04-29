import { Router } from 'express';
import { NewspostsService } from '../services/NewspostsService';
import { requireAuth } from '../middleware/auth';

export default function newspostsRouter(newspostsService: NewspostsService) {
    const router = Router();

    router.use(requireAuth);

    router.get('/', async (req, res, next) => {
        try {
            const page = Number(req.query.page || 0);
            const size = Number(req.query.size || 10);

            const result = await newspostsService.getAll(page, size);
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', async (req, res, next) => {
        try {
            const result = await newspostsService.getById(Number(req.params.id));
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.post('/', async (req: any, res, next) => {
        try {
            const { header, text } = req.body;

            const result = await newspostsService.create({
                header,
                text,
                authorId: req.user.id,
            });

            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    });

    return router;
}