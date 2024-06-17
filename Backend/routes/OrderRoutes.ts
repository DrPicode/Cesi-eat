// routes/OrderRoutes.ts
import express  from 'express';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Créer une nouvelle commande
router.post('/', async (req, res) => {
    try {
        // Récupérer le panier et ses articles
        const cart = await prisma.cart.findUnique({
            where: { id_cart: req.body.cartId },
            include: {
                articles: {
                    include: {
                        article: true,
                    },
                },
            },
        });

        if (!cart) {
            return res.status(404).json({ error: 'Panier non trouvé' });
        }

        // Créer la commande
        const order = await prisma.order.create({
            data: {
                is_deleted: false,
                price: req.body.price,
                delivery_fees: req.body.deliveryFees,
                service_fees: req.body.serviceFees,
                address: {
                    connect: { id_address: req.body.addressId},
                },
                delivery_hour: req.body.deliveryDate,
                delivery_code: req.body.deliveryCode,
                cart: {
                    connect: { id_cart: req.body.cartId },
                },
                status: 'Paid',
            },
        });

        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de la commande' });
    }
});

// Obtenir la liste des commandes
router.get('/', async (req, res) => {
    try {
        const orders = await prisma.order.findMany();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});

router.get('id/:id', async (req, res) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id_order: parseInt(req.params.id) },
            include: {
                address: true,
                cart: {
                    include: {
                        articles: {
                            include: {
                                article: true,
                            },
                        },
                    },
                },
            },
        });

        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});

router.get('/latest', async (req, res) => {
    try {
        const order = await prisma.order.findFirst({
            orderBy: { id_order: 'desc' },
            include: {
                address: true,
                cart: {
                    include: {
                        articles: {
                            include: {
                                article: true,
                            },
                        },
                    },
                },
            },
        });

        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});

// get all orders by user
router.get('/user/:id', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                cart: {
                    user_id_user: parseInt(req.params.id),
                },
            },
            include: {
                address: true,
                cart: {
                    include: {
                        articles: {
                            include: {
                                article: true,
                            },
                        },
                    },
                },
            }
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});

export default router;

