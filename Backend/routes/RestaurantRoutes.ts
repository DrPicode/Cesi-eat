import express, { Request, Response } from 'express';
import { prisma } from "../database/client";
import multer from 'multer';

const router = express.Router();

//get restaurants
router.get('/', async (req: Request, res: Response) => {
    // Fetch restaurants from DB
    const restaurants = await prisma.restaurant.findMany({
        where: {
            is_open: true
        },
        relationLoadStrategy: "join",
        include: {
            address: true
        }
    });
    // Return restaurants
    return res.status(200).json(restaurants);
})

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

//get the orders of a restaurant by user
router.get('/orders', async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({ orderBy: { id_order: 'desc' } });
    for (const order of orders) {
        const cart = await prisma.cart.findFirst({
            where: { order_id_order: order.id_order }, include: {
                articles: {
                    include: {
                        article: true
                    }
                }
            }
        });
        (order as any).cart = cart
    }
    return res.status(200).json(orders);
});

//change status of order to "preparing"
router.post('/orders/:orderId/accept', async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.orderId);
    console.log('accepting order', orderId)
    await prisma.order.update({ where: { id_order: orderId }, data: { status: "Preparing" } });
    return res.status(200).json({ success: true });
});

//change status of order to "cancelled"
router.post('/orders/:orderId/reject', async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.orderId);
    console.log('cancelling order', orderId)
    await prisma.order.update({ where: { id_order: orderId }, data: { status: "Cancelled" } });
    return res.status(200).json({ success: true });
});

//change status of order to "done"
router.post('/orders/:orderId/ready', async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.orderId);
    console.log('cancelling order', orderId)
    await prisma.order.update({ where: { id_order: orderId }, data: { status: "Done" } });
    return res.status(200).json({ success: true });
});

// get the restaurant id with a restaurant name
router.get('/name/:name', async (req: Request, res: Response) => {
    const name = req.params.name;
    const restaurant = await prisma.restaurant.findFirst({
        where: {
            name: name
        }
    });
    return res.status(200).json(restaurant);
});

// change the status of a restaurant to closed
router.post('/:restaurantId/close', async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.restaurantId);
    console.log('closing restaurant', restaurantId)
    await prisma.restaurant.update({ where: { id_restaurant: restaurantId }, data: { is_open: false } });
    return res.status(200).json({ success: true });
});

// change the status of a restaurant to open
router.post('/:restaurantId/open', async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.restaurantId);
    console.log('opening restaurant', restaurantId)
    await prisma.restaurant.update({ where: { id_restaurant: restaurantId }, data: { is_open: true } });
    return res.status(200).json({ success: true });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Backend/content');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// create a restaurant
router.post('/', upload.single('thumbnail'), async (req: Request, res: Response) => {
    const { name, type, user_id_user } = req.body;

    const restaurant = await prisma.restaurant.create({
        data: {
            name,
            is_deleted: false,
            type,
            thumbnail: "http://localhost:8080/content/" + req.file.filename,
            user: {
                connect: {
                    id_user: parseInt(user_id_user),
                }
            }
        }
    });
    return res.status(200).json(restaurant);
});

// get the restaurant by id
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

// get the orders of a restaurant by restaurant id
router.get('/orders/:restaurantId', async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.restaurantId);

    const orders = await prisma.order.findMany({
        where: {
            cart: {
                articles: {
                    some: {
                        article: {
                            restaurant_id_restaurant: restaurantId
                        }
                    }
                }
            }
        },
        orderBy: { id_order: 'desc' },
        include: {
            cart: {
                include: {
                    articles: {
                        include: {
                            article: true
                        }
                    }
                }
            }
        }
    });

    return res.status(200).json(orders);
});


export default router;