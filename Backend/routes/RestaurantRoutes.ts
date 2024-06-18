import express, { Request, Response } from 'express';
import { prisma } from "../database/client";

const router = express.Router();

// Get restaurants
router.get('/', async (req: Request, res: Response) => {
    // Fetch restaurants from DB
    const restaurants = await prisma.restaurant.findMany({
        relationLoadStrategy: "join",
        include: {
            address: true
        }
    });
    // Return restaurants
    return res.status(200).json(restaurants);
})

router.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            id_restaurant: id
        },
        include: {
            address: true,
            articles: true
        }
    });
    return res.status(200).json(restaurant);
});

//get the restaurant of a user
router.get('/user/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const restaurant = await prisma.restaurant.findFirst({
        where: {
            user_id_user: id
        }
    });
    return res.status(200).json(restaurant);
});

// create a restaurant
router.post('/', async (req: Request, res: Response) => {
    const restaurant = await prisma.restaurant.create({
        data: {
            name: req.body.name,
            is_deleted: false,
            type: req.body.type,
            thumbnail: "empty",
            user: {
                connect: {
                    id_user: req.body.user_id_user
                }
            }
        }
    });
    return res.status(200).json(restaurant);
});

export default router;