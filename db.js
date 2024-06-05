const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectDB = async () => {
    if (!db) {
        await client.connect();
        db = client.db(process.env.MONGO_DB_NAME);
        console.log('Connected to MongoDB');
    }
    return db;
};

module.exports = connectDB;