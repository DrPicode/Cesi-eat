const express = require('express');
const jwt = require('jsonwebtoken');
const connectDB = require('C:/Users/TRENY Sonia/OneDrive/Documents/Cesi/A4/Projet Elective Web/Projet/Cesi-eat/db');
const router = express.Router();

module.exports = (secretKey) => {
    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        const collectionName = process.env.MONGODB_COLLECTION;

        try {
            const db = await connectDB();
            const user = await db.collection(collectionName).findOne({ username, password });

            if (user) {
                const token = jwt.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
                return res.json({ token });
            }

            res.status(401).json({ error: 'Invalid credentials' });
        } catch (error) {
            console.error('Error during authentication', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return router;
};