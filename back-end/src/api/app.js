const express = require('express');
const LoginRoutes = require('../routes/LoginRoutes');
const UserRoutes = require('../routes/UserRoutes');

const app = express();

// Testando

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(LoginRoutes);
app.use(UserRoutes);

module.exports = app;
