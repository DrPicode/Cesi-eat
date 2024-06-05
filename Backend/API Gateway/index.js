require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const jwtAuth = require('./middlewares/jwtAuth');
const authController = require('./auth/authController');
const service1 = require('./services/service1');
const service2 = require('./services/service2');
const service3 = require('./services/service3');

const app = express();
const port = process.env.PORT;
const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json());

// Route d'authentification
app.use('/auth', authController(secretKey));

// Routes des services avec middleware JWT
app.get('/service1', jwtAuth(secretKey), service1);
app.get('/service2', jwtAuth(secretKey), service2);
app.get('/service3', jwtAuth(secretKey), service3);

app.listen(port, () => {
    console.log(`API Gateway is running on http://localhost:${port}`);
});