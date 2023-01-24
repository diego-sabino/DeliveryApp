const express = require('express');
const LoginRoutes = require('../routes/LoginRoutes');
const UserRoutes = require('../routes/UserRoutes');
const CustumerRoutes = require('../routes/CustumerRoutes');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(LoginRoutes);
app.use(UserRoutes);
app.use(CustumerRoutes);

module.exports = app;
