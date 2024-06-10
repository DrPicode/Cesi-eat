// models/User.ts

// Model for MongoDB database
import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
    userfirstname : string;
    username: string;
    password: string;
    email : string; 
    phone : string; 
    status : string ; 
}

const userSchema: Schema<UserDocument> = new mongoose.Schema({
    username: String,
    password: String, 
    userfirstname : String,
    email : String,
    phone : String,
    status : String, 
});

interface UserData extends UserDocument, Document {
}

export default mongoose.model<UserDocument>('User', userSchema);
export { UserData };