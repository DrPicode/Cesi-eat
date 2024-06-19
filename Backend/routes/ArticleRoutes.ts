import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

//create a new article
router.post('/create', async (req: express.Request, res: express.Response) => {
    const { name, price, thumbnail, type, restaurant_id_restaurant } = req.body;

    try {
        const newArticle = await prisma.article.create({
            data: {
                name,
                price,
                thumbnail: "null",
                is_deleted: false,
                type,
                restaurant_id_restaurant,
            },
        });
        return res.status(201).json(newArticle);
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Obtain the list of article
router.get('/articles', async (req: express.Request, res: express.Response) => {
    const restaurantId = parseInt(req.params.restaurantId);

    try {
        const articles = await prisma.article.findMany({
            where: {
                restaurant_id_restaurant: restaurantId,
                is_deleted: false,
            },
        });
        return res.status(200).json(articles);
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// get articles by restaurant id
router.get('/restaurant/:restaurantId', async (req: express.Request, res: express.Response) => {
    const restaurantId = parseInt(req.params.restaurantId);
    try {
        const articles = await prisma.article.findMany({
            where: {
                restaurant_id_restaurant: restaurantId,
                is_deleted: false,
            },
        });
        return res.status(200).json(articles);
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

//modify one article
router.post('/update/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, price, thumbnail, is_deleted, type, restaurant_id_restaurant } = req.body;

    try {
        const updatedArticle = await prisma.article.update({
            where: { id_article: id },
            data: {
                name,
                price,
                thumbnail,
                is_deleted,
                type,
                restaurant_id_restaurant,
            },
        });
        return res.status(200).json(updatedArticle);
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

//delete one article
router.post('/delete/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        const deletedArticle = await prisma.article.update({
            where: { id_article: id },
            data: {
                is_deleted: true,
            },
        });
        return res.status(200).json(deletedArticle);
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});


export default router;