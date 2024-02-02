const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/books', (req, res) => {
  const books = [
    {
      userId: 'oeihfzeoi',
      title: 'Mon premier objet',
      author: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      year: 4900,
      genre: 'Fantastique',
      ratings: [
        {
          userId: 'qsomihvqios',
          grade: 5,
        }
      ],
      averageRating: 3.5
    }
  ];
  res.status(200).json(books);
});

module.exports = app;