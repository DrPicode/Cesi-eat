import express  from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';


import cors from "cors";

// Route Import
import authRoutes from './routes/AuthRoutes';
import userRoutes from './routes/UserRoutes';
import orderRoutes from './routes/OrderRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

const prisma = new PrismaClient();

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
app.use('/orders', orderRoutes);

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
