// middlewares/authenticateToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Définition du type pour l'utilisateur dans la requête
interface AuthRequest extends Request {
    user?: JwtPayload;
}

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Token non fourni');
    }
    jwt.verify(token, 'secret_key', (err, user: JwtPayload | undefined) => {
        if (err) {
            return res.status(403).send('Token invalide');
        }
        if (!user) {
            return res.status(403).send('Token invalide');
        }
        // Affecter l'utilisateur vérifié à req.user
        req.user = user;
        next();
    });
};

export default authenticateToken;