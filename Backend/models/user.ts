// models/User.ts

// Model for MongoDB database
import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone: string;
    role: string ;
}

const userSchema: Schema<UserDocument> = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    phone: String,
    role: String,
});

interface UserData extends UserDocument, Document {
}

export default mongoose.model<UserDocument>('User', userSchema);
export { UserData };