import express, { Request, Response } from 'express';
import {prisma} from "../database/client";

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

export default router;