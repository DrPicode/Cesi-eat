export interface RefreshTokenDocument {
    userId: number;
    token: string;
    expiryDate: Date;
}