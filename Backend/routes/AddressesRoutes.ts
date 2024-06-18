import express  from 'express';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req : express.Request, res : express.Response) => {
    const addresses = await prisma.address.findMany();
    res.status(200).json(addresses);
});

// create a route to find the id_address with the address
router.get('/:address', async (req : express.Request, res : express.Response) => {
    const address = req.params.address;
    const addressId = await prisma.address.findFirst({
        where: {
            address: address,
        },
    });
    res.status(200).json(addressId);
});

//create a route to find the last address created
router.patch('/linkToRestaurant', async (req : express.Request, res : express.Response) => {
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




/*router.post('/', async (req : express.Request, res : express.Response) => {
    try {
        const newAddress = await prisma.address.create({
            data: {
                address: req.body.address,
                is_deleted: false,
            },
        });
        res.status(201).json(newAddress);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Failed to create address' });
    }
});*/

export default router;