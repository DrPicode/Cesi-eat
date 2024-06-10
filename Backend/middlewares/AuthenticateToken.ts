// middlewares/authenticateToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Type for request creation
interface AuthRequest extends Request {
    user?: JwtPayload;
}


// Token Creation
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Token non fourni');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user: JwtPayload | undefined) => {
        if (err) {
            return res.status(403).send('Token invalide');
        }
        if (!user) {
            return res.status(403).send('Token invalide');
        }
        // Give the token 
        req.user = user;
        next();
    });
};

export default authenticateToken;