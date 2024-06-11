import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, {UserDocument} from '../models/user';
import RefreshToken from '../models/RefreshToken';
import { JwtUserPayload } from '../models/Token';

const router = Router();

const generateAccessToken = (user: JwtUserPayload) => {
    return jwt.sign({ userId: user.userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

const generateRefreshToken = (userId: string) => {
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 jours de validité

    const newRefreshToken = new RefreshToken({
        userId,
        token: refreshToken,
        expiryDate,
    });

    newRefreshToken.save();
    return refreshToken;
};


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
        if (!req.body.email || !req.body.password) throw new Error("Email et mot de passe manquant");
        const user: UserDocument | null = await User.findOne({ email : req.body.email });
        console.log({user});
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateAccessToken({ userId: user._id.toString(), username: user.username });
            const refreshToken = generateRefreshToken(user._id.toString());
            res.status(200).json({ accessToken, refreshToken });
        } else {
            res.status(401).send('Mot de passe incorrect');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'authentification');
    }
});

// Route pour rafraîchir le token
router.post('/token', async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).send('Refresh token non fourni');
    }
    try {
        jwt.verify(token, process.env.JWT_REFRESH_SECRET!, (error: jwt.VerifyErrors | null, decoded: object | undefined) => {
            if (error || !decoded) {
                return res.status(403).send('Refresh token invalide');
            }

            const user = decoded as JwtUserPayload;
            const newAccessToken = generateAccessToken(user);
            res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors du rafraîchissement du token');
    }
});

export default router;