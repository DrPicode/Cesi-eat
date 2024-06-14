import {Router, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtUserPayload } from '../models/Token';
import {prisma} from "../database/client";
import {generateAccessToken, generateRefreshToken} from "../utils/jwt";
import {UserType} from "@prisma/client";

const router = Router();

// New user creation
router.post('/register', async (req: Request, res: Response) => {
    const {lastName, firstName, email, phone, password, status, address, city, postalCode} = req.body;

    // Check if all fields are provided
    if (!lastName || !firstName || !email || !phone || !password || !status || !address || !city || !postalCode) {
        return res.status(400).send('Tous les champs sont requis');
    }

    console.log("User:", {lastName, firstName, email, phone, password, status, address, city, postalCode})

    // Check if user already exists
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (user) {
        return res.status(400).send('Utilisateur déjà existant');
    }

    // Create user
    try {
        let userType: UserType;
        switch (status) {
            case "consommateur":
                userType = UserType.Client;
                break;
            case "livreur":
                userType = UserType.DeliveryMan;
                break;
            case "restaurateur":
                userType = UserType.Cooker;
                break;
        }

        const passwordCrypted = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: passwordCrypted,
                phone,
                type: userType,
                address: {
                    create: {
                        address,
                        city,
                        postalCode,
                        is_deleted: false
                    }

                }
            }
        });
        console.log({user});
        delete user.password;
        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erreur lors de la création de l\'utilisateur');
    }
});

// Authentication
router.post('/login', async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password) throw new Error("Email et mot de passe manquant");
        const user = await prisma.user.findUnique(
            {
                where: {
                    email: req.body.email
                }
            }
        );
        console.log("User", user);
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateAccessToken({ userId: user.id_user.toString(), lastName: user.lastName });
            const refreshToken = generateRefreshToken(user.id_user.toString());
            console.log({refreshToken, accessToken});
            res.cookie("refresh", refreshToken, {
                httpOnly: true,
                maxAge: 7 * 60 * 24 * 30, // 7 jours,
                path: "/",
            })

            return res.status(200).json({
                accessToken,
                userId: user.id_user
            });
        } else {
            return res.status(401).send('Mot de passe incorrect');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'authentification');
    }
});

// Route pour rafraîchir le access token
router.get('/token', async (req: Request, res: Response) => {
    const rawCookies = req.headers.cookie;
    console.log({rawCookies});
    const token = rawCookies?.split(';').find((c: string) => c?.trim()?.startsWith('refresh='))?.split('=')[1];
    console.log({token});
    if (!token) {
        return res.status(401).send('Refresh token non fourni');
    }
    try {
        jwt.verify(token, process.env.JWT_REFRESH_SECRET!, (error: jwt.VerifyErrors | null, decoded: object | undefined) => {
            if (error || !decoded) {
                res.cookie("refresh", "", { httpOnly: true, maxAge: 0 })
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

// Route pour se déconnecter
router.get('/logout', async (req: Request, res: Response) => {
    res.cookie("refresh", "", { httpOnly: true, maxAge: 0 })
    res.status(204).send();
});

export default router;