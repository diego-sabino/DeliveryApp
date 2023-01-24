const express = require('express');
const path = require('path');

const router = express.Router();

const caminhoImagens = path.resolve('public');

router.use('/images', express.static(caminhoImagens));

module.exports = router;    