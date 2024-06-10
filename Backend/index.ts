import express  from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {Sequelize}  from 'sequelize';

// Route Import
import authRoutes from './routes/AuthRoutes';
import userRoutes from './routes/UserRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT ;


const dbName: string = process.env.POSTGRES_DB as string;
const dbUser: string = process.env.POSTGRES_USER as string;
const dbPassword: string = process.env.POSTGRES_PASSWORD as string;

// MongoDB Connexion
const MONGO_URL = process.env.MONGO_URL as string;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((error: Error) => console.error('MongoDB connection error:', error));


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres', 
});
    
sequelize.authenticate().then(() => {
    console.log('SQL database connected');
}).catch((error:Error) => {
    console.error('SQL database connection error:', error);
});


// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// 404 error Management
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Global Error Management
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Server Creation
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



