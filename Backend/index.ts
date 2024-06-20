import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import { prisma } from "./database/client";


import cors from "cors";

// Route Import
import authRoutes from './routes/AuthRoutes';
import userRoutes from './routes/UserRoutes';
import restaurantRoutes from './routes/RestaurantRoutes';
import orderRoutes from './routes/OrderRoutes';
import addressRoutes from './routes/AddressesRoutes';
import contentRoutes from "./routes/ContentRoutes";
import cartRoutes from "./routes/CartRoutes";
import articleRoutes from "./routes/ArticleRoutes";
import deliveriesRoutes from "./routes/DeliveriesRoutes";


const app = express();
const PORT = process.env.PORT;

// const prisma = new PrismaClient();
prisma.$connect()
    .then(() => console.log('Prisma connected'))
    .catch((error: Error) => console.error('Prisma connection error:', error));

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
app.use("/articles", articleRoutes);
app.use('/orders', orderRoutes);
app.use('/deliveries', deliveriesRoutes);

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
