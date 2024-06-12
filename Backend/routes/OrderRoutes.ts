// routes/OrderRoutes.ts
import express  from 'express';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateOrder } from '../middlewares/ValidateOrder';

const router = Router();
const prisma = new PrismaClient();

router.post('/', validateOrder, async (req : express.Request, res : express.Response) => {
  const {
    Order_ID,
    Order_Date,
    Boisson,
    Sandwitch,
    Price,
    Delivery_Fees,
    Service_Fees,
    Id_User,
    Delivery_Hour,
    Delivery_Code,
    Is_Deleted,
    Id_Address,
    Id_Order_Status,
    Id_Deliveryman,
    Id_Restaurant
  } = req.body;

  try {
    const order = await prisma.orders.create({
      data: {
        Order_ID,
        Order_Date: new Date(Order_Date),
        Boisson,
        Sandwitch,
        Price,
        Delivery_Fees,
        Service_Fees,
        Id_User,
        Delivery_Hour: new Date(`1970-01-01T${Delivery_Hour}`),
        Delivery_Code,
        Is_Deleted,
        Id_Address,
        Id_Order_Status,
        Id_Deliveryman,
        Id_Restaurant,
      },
    });
    res.status(201).json(order);
  } catch (error) {
    console.error('Error occurred:', error); 
    res.status(500).json({ error: 'Failed to create order' });
  }
});

export default router;