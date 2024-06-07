// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
    username: string;
    password: string;
}

const userSchema: Schema<UserDocument> = new mongoose.Schema({
    username: String,
    password: String
});

export default mongoose.model<UserDocument>('User', userSchema);