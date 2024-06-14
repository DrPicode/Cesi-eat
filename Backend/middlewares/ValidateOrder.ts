// middleware/validateOrder.ts
import { Request, Response, NextFunction } from 'express';

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  const {
    order_date,
    sandwich,
    drink,
    side_food,
    price,
    delivery_fees,
    service_fees,
    delivery_hour,
    delivery_code,
    is_deleted,
    id_address,
    id_order_status,
    id_restaurant
  } = req.body;

  if (!order_date || !price || !delivery_hour || !delivery_code  || !id_address || !id_order_status || !id_restaurant) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  next();
};