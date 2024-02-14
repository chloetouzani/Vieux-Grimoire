const Book = require('../models/book');
const fs = require('fs')

exports.createBook = (req, res) => {
  const bookObject =JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  book.save()
  .then(res.status(201).json({ message: 'Objet enregisté !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.rateBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
  .then((book) => {
    const isAlreadyRated = book.ratings.find(
      (book) => book.userId === req.auth.userId
    );

    if (!isAlreadyRated) {
      book.ratings.push({
        userId: req.auth.userId,
        grade: req.body.rating,
      });

      const averageRating = (book.ratings.reduce(
        (accumulator, currentValue) => accumulator + currentValue.grade,
            0 )/ book.ratings.length).toFixed(2);
      book.averageRating = averageRating;

      return book.save();
    } else {
      res.status(401).json({ message: "Book already rated" });
    }
  })
  .then((book) => res.status(201).json(book))
  .catch((error) => res.status(500).json({ error }));
  };

exports.modifyBook = (req, res) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
} : { ...req.body };

  delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteBook = (req, res) => {
  Book.findOne({ _id: req.params.id})
  .then(book => {
      if (book.userId != req.auth.userId) {
          res.status(401).json({message: 'Not authorized'});
      } else {
          const filename = book.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Book.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                  .catch(error => res.status(401).json({ error }));
          });
      }
  })
  .catch( error => {
      res.status(500).json({ error });
  });
};

exports.getOneBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllBooks = (req, res) => {
  Book.find()
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({ error }));
};

exports.getBestBooks = (req, res) => {
  Book.find().sort({ averageRating: -1 }).limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
}
