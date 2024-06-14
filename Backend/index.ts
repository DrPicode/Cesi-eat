import express  from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//import { PrismaClient } from '@prisma/client';
import {prisma} from "./database/client";


import cors from "cors";

// Route Import
import authRoutes from './routes/AuthRoutes';
import userRoutes from './routes/UserRoutes';
import restaurantRoutes from './routes/RestaurantRoutes';
import orderRoutes from './routes/OrderRoutes';
import addressRoutes from './routes/AddressesRoutes';
import contentRoutes from "./routes/ContentRoutes";
import cartRoutes from "./routes/CartRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

// const prisma = new PrismaClient();
prisma.$connect()
    .then(() => console.log('Prisma connected'))
    .catch((error: Error) => console.error('Prisma connection error:', error));

// MongoDB Connexion
const MONGO_URL = process.env.MONGO_URL as string;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((error: Error) => console.error('MongoDB connection error:', error));

// Middleware
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
    res.status(201).send('Test');
});
app.post("/test", (req, res) => {
    console.log(req.body);
    res.status(201).send('Test');

})
// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/content", contentRoutes)
app.use("/addresses", addressRoutes);
app.use("/carts", cartRoutes);
// app.use('/orders', orderRoutes);

// 404 error Management
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Global Error Management
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error occurred:', err); 
    res.status(500).json({ error: 'Internal server error' });
  });

// Server Creation
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export { prisma };
