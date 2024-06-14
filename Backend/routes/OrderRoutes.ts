/*// routes/OrderRoutes.ts
import express  from 'express';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateOrder } from '../middlewares/ValidateOrder';

const router = Router();
const prisma = new PrismaClient();

router.post('/', validateOrder, async (req : express.Request, res : express.Response) => {
  const {
    order_date,
    sandwich,
    drink,
    side_food,
    price,
    delivery_fees,
    service_fees,
    id_user,
    delivery_hour,
    delivery_code,
    is_deleted,
    id_address,
    id_order_status,
    id_restaurant,
  } = req.body;

  try {
    const order = await prisma.orders.create({
      data: {
        order_date: new Date(order_date),
        sandwich,
        drink,
        side_food,
        price,
        delivery_fees,
        service_fees,
        id_user,
        delivery_hour: new Date(`1970-01-01T${delivery_hour}`),
        delivery_code,
        is_deleted,
        id_address,
        id_order_status,
        id_restaurant,
      },
    });
    res.status(201).json(order);
  } catch (error) {
    console.error('Error occurred:', error); 
    res.status(500).json({ error: 'Failed to create order' });
  }
});

router.put('/:id', validateOrder, async (req: express.Request, res: express.Response) => {
  const {
    order_date,
    sandwich,
    drink,
    side_food,
    price,
    delivery_fees,
    service_fees,
    id_user,
    delivery_hour,
    delivery_code,
    is_deleted,
    id_address,
    id_order_status,
    id_restaurant,
  } = req.body;

  const { id } = req.params;

  try {
    const order = await prisma.orders.update({
      where: { order_id: parseInt(id) },
      data: {
        order_date: new Date(order_date),
        sandwich,
        drink,
        side_food,
        price,
        delivery_fees,
        service_fees,
        id_user,
        delivery_hour: new Date(`1970-01-01T${delivery_hour}`),
        delivery_code,
        is_deleted,
        id_address,
        id_order_status,
        id_restaurant,
      },
    });
    res.status(200).json(order);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// route pour delete une commande
router.delete('/:id', async (req: express.Request, res: express.Response) => {
  const orderId = parseInt(req.params.id);

  try {
    await prisma.orders.delete({
      where: { order_id: orderId },
    });
    res.status(204).send();
    console.error('Order n°',orderId);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const orders = await prisma.orders.findMany();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

export default router;
 */