import express  from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import des routes
import authRoutes from './routes/AuthRoutes';
import userRoutes from './routes/UserRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

// Connexion à MongoDB
const MONGO_URL = process.env.MONGO_URL as string;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((error: Error) => console.error('MongoDB connection error:', error));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Gestion des erreurs globales
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Création du serveur
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:8082`);
});