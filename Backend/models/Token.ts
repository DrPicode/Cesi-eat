import { JwtPayload } from 'jsonwebtoken';

export interface JwtUserPayload extends JwtPayload {
    username: string;
    userId: string;
}