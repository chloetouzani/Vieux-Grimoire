const express = require('express');
const auth = require('../middleware/auth');
const libraryCtrl = require('../controllers/library');
const router = express.Router();
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, libraryCtrl.createBook);
router.post('/:id/rating', auth, libraryCtrl.rateBook);
router.get('/', libraryCtrl.getAllBooks);
router.get('/bestrating', libraryCtrl.getBestBooks);
router.get('/:id', libraryCtrl.getOneBook);
router.put('/:id', auth, multer, libraryCtrl.modifyBook);
router.delete('/:id', auth, libraryCtrl.deleteBook);

module.exports = router;
