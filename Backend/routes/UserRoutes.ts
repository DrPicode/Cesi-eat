// routes/userRoutes.ts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import authenticateToken from '../middlewares/AuthenticateToken';

const router = express.Router();

// Route pour récupérer tous les utilisateurs 
router.get('/users', authenticateToken, async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
});

export default router;