// routes/CartRoutes.ts
import express from 'express';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateToken } from "../utils/jwt";

const router = Router();
const prisma = new PrismaClient();

// Get all carts
router.get('/', async (req, res) => {
    // Check token
    const isValidToken = validateToken(req);
    if (isValidToken == false) {
        res.status(401).json({ error: "Unauthorized" })
    }

    try {
        const carts = await prisma.cart.findMany({
            include: {
                user: true,
                articles: {
                    include: {
                        article: true
                    }
                }
            }
        });
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new cart
router.post('/', async (req, res) => {
    // Get token from headers
    const token: any = validateToken(req);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { selectedSandwich, selectedSideFood, selectedDrink } = req.body;

    // Create a new cart
    const cart = await prisma.cart.create({
        data: {
            is_deleted: false,
            user: {
                connect: {
                    id_user: parseInt(token.userId)
                }
            },
            articles: {
                createMany: {
                    data: [
                        { quantity: 1, articleId: selectedSandwich },
                        { quantity: 1, articleId: selectedSideFood },
                        { quantity: 1, articleId: selectedDrink }
                    ]
                }
            }
        }
    });

    res.json(cart);
});

// Get the latest cart
router.get('/latest', async (req, res) => {
    const token: any = validateToken(req);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = parseInt(token.userId);

    const cart = await prisma.cart.findFirst({
        where: {
            user: {
                id_user: userId
            }
        },
        orderBy: {
            id_cart: 'desc'
        },
        include: {
            articles: {
                include: {
                    article: true
                }
            }
        }
    });

    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(cart);
});

export default router;