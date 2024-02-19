'use strict';

const express   = require('express');
const cors      = require('cors');
const mongoose  = require('mongoose');
const path      = require('path');

require('dotenv').config();

const app = express();
app.use(express.json()).use(cors());

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app
  .use('/api/books', require('./routes/library'))
  .use('/api/auth', require('./routes/user'))
  .use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
