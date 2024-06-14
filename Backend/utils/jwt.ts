import {JwtUserPayload} from "../models/Token";
import jwt from "jsonwebtoken";
import {Request, Response} from "express";

export const generateAccessToken = (user: JwtUserPayload) => {
    return jwt.sign({ userId: user.userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export const generateRefreshToken = (userId: string) => {
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    return refreshToken;
};

export const validateToken = (req: Request) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return false
    }

    // Validate token
    return jwt.verify(token, process.env.JWT_SECRET, {}, (err, _) => {
        return !err;
    })
}