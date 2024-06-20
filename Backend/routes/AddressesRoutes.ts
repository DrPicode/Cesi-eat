import express from 'express';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// get all addresses
router.get('/', async (req: express.Request, res: express.Response) => {
    const addresses = await prisma.address.findMany();
    res.status(200).json(addresses);
});

// find the id_address with the address
router.get('/:address', async (req: express.Request, res: express.Response) => {
    const address = req.params.address;
    const addressId = await prisma.address.findFirst({
        where: {
            address: address,
        },
    });
    res.status(200).json(addressId);
});

// connect the address to the restaurant
router.patch('/linkToRestaurant', async (req: express.Request, res: express.Response) => {
    const linkRestaurant = await prisma.address.update({
        where: {
            id_address: req.body.id_address,
        },
        data: {
            restaurant: {
                connect: {
                    id_restaurant: req.body.id_restaurant,
                },
            },
        },
    });
    res.status(200).json(linkRestaurant);
});

export default router;