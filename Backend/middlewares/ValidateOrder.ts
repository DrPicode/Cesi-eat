// middleware/validateOrder.ts
import { Request, Response, NextFunction } from 'express';

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  const {
    Order_ID,
    Order_Date,
    Sandwich,
    Drink,
    Side_Food,
    Price,
    Delivery_Fees,
    Service_Fees,
    Id_User,
    Delivery_Hour,
    Delivery_Code,
    Is_Deleted,
    Id_Address,
    Id_Order_Status,
    Id_Restaurant
  } = req.body;

  if (!Order_Date || !Price || !Delivery_Hour || !Delivery_Code  || !Id_Address || !Id_Order_Status || !Id_User || !Id_Restaurant) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  next();
};