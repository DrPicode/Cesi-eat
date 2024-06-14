// routes/OrderRoutes.ts
import express  from 'express';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all carts
router.get('/', async (req, res) => {
    try {
        const carts = await prisma.cart.findMany();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Post a new cart
router.post('/', async (req, res) => {
    const {

    } = req.body;
    try {
        const cart = await prisma.cart.create({
            data: req.body
        });
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;