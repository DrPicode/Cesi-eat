import { JwtPayload } from 'jsonwebtoken';

export interface JwtUserPayload extends JwtPayload {
    lastName: string;
    userId: string;
}