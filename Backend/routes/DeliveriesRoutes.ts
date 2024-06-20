import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateToken } from "../utils/jwt";

const router = express.Router();
const prisma = new PrismaClient();

// Get all deliveries
router.get('/deliveries', async (req: Request, res: Response) => {
    const deliveries = await prisma.order.findMany({
        where: { status: { in: ['Done', 'Delivering', 'Delivered'] } },
        include: {
            address: true,
            cart: {
                include: {
                    articles: {
                        include: {
                            article: {
                                include: {
                                    restaurant: true
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: {
            id_order: 'desc'
        }
    });
    res.json({ deliveries, restaurant: deliveries[0]?.cart?.articles[0]?.article?.restaurant ?? {} });
});

// Change status of delivery to delivering
router.post('/deliveries/:orderId/delivering', async (req: Request, res: Response) => {
    if (!validateToken(req)) return res.status(401).send("Unauthorized");
    const orderId = parseInt(req.params.orderId);
    await prisma.order.update({ where: { id_order: orderId }, data: { status: "Delivering" } });
    return res.status(200).json({ success: true });
});

// Change status of delivery to delivered
router.post('/deliveries/:orderId/delivered', async (req: Request, res: Response) => {
    if (!validateToken(req)) return res.status(401).send("Unauthorized");
    const orderId = parseInt(req.params.orderId);
    const code = parseInt(req.body.code);
    const order = await prisma.order.findFirst({ where: { id_order: orderId } });
    if (order?.delivery_code !== code) {
        return res.status(400).json({ success: false, message: "Code is incorrect" });
    }
    await prisma.order.update({ where: { id_order: orderId }, data: { status: "Delivered" } });
    return res.status(200).json({ success: true });
});

export default router;