import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL as string;
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((error: Error) => console.error('MongoDB connection error:', error));
export default mongoose;
