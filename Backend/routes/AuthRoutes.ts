import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, {UserDocument} from '../models/user';

const router = Router();

// New user creation
router.post('/register', async (req: Request, res: Response) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user: UserDocument = new User({
            username: req.body.username,
            password: hashedPassword
        });
        await user.save();
        res.status(201).send('Utilisateur créé avec succès');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la création de l\'utilisateur');
    }
});

// Authentication
router.post('/login', async (req: Request, res: Response) => {
    try {
        const user: UserDocument | null = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token: string = jwt.sign({ username: user.username }, 'secret_key');
            res.status(200).json({ token });
        } else {
            res.status(401).send('Mot de passe incorrect');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'authentification');
    }
});

export default router;