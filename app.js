const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const libraryRoutes = require('./routes/library');
const userRoutes = require('./routes/user');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
mongoose.createConnection('', { useNewUrlParser: true });


app.use('/api/books', libraryRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;