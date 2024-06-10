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
            userfirstname : req.body.userfirstname,
            username: req.body.username,
            password: hashedPassword,
            email : req.body.email,
            phone : req.body.phone, 
            status : req.body.status
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
        const user: UserDocument | null = await User.findOne({ email : req.body.email });
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token: string = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {expiresIn : '1h'});
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