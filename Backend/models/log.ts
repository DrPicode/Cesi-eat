import mongoose from '../database/mongoose';

const schema = new mongoose.Schema({ log: String }, { timestamps: true });
export const Log = mongoose.model('Log', schema);
