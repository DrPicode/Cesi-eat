import express  from 'express';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req : express.Request, res : express.Response) => {
    const addresses = await prisma.address.findMany();
    res.status(200).json(addresses);
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