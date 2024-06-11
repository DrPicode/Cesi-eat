// models/RefreshToken.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface RefreshTokenDocument extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    token: string;
    expiryDate: Date;
}

const refreshTokenSchema: Schema<RefreshTokenDocument> = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    expiryDate: { type: Date, required: true },
});



export default mongoose.model<RefreshTokenDocument>('RefreshToken', refreshTokenSchema);