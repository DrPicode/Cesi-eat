require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const middlewareJwtAuth = require('./Middleware/jwtAuth');
const authController = require('./Authentification/AuthController');
const UserCollection = require('C:/Users/TRENY Sonia/OneDrive/Documents/Cesi/A4/Projet Elective Web/Projet/Cesi-eat/db.js').collection("User-info");
//const service1 = require('./services/service1');
//const service2 = require('./services/service2');
//const service3 = require('./services/service3');

const app = express();
const port = process.env.PORT || 8080;
const secretKey = process.env.SECRET_KEY; // Assurez-vous que cela correspond à ce qui est dans votre fichier .env

app.use(bodyParser.json());

console.log(`Starting API Gateway on port ${port}`);
console.log(`Using secret key: ${secretKey}`);
console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
console.log(`MongoDB Database: ${process.env.MONGO_DB_NAME}`);
console.log(`MongoDB Collection: ${process.env.MONGODB_COLLECTION}`);

// Route d'authentification
app.use('/auth', authController(secretKey));

// Routes des services avec middleware JWT
//app.get('/service1', jwtAuth(secretKey), service1);
//app.get('/service2', jwtAuth(secretKey), service2);
//app.get('/service3', jwtAuth(secretKey), service3);

app.listen(port, () => {
    console.log(`API Gateway is running on http://localhost:${port}`);
});