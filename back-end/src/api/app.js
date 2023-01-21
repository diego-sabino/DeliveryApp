const express = require('express');
const LoginController = require('../routes/LoginRoutes');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(LoginController);

module.exports = app;
