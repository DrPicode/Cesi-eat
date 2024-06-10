// routes/userRoutes.ts 
import express, { Request, Response } from 'express';
import User, {UserData} from '../models/user';
import authenticateToken from '../middlewares/AuthenticateToken';
import mongoose, { Types } from 'mongoose';

const router = express.Router();

// GET every users
router.get('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
});

// Update user
router.put('/users/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        // Validate the userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid user ID format');
        }
        

        // Don't allow password changes here
        if (updates.password) {
            return res.status(400).send('Password update not allowed via this route.');
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);
        const userup: UserData | null = await User.findByIdAndUpdate(userObjectId, updates, { new: true });
        
        if (!userup) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(userup);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
});

// Delete user
router.delete('/users/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user: UserData | null = await User.findByIdAndDelete(userId);
        
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
});


export default router;