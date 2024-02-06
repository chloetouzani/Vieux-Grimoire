const express = require('express');
const auth = require('../middleware/auth');
const libraryCtrl = require('../controllers/library');
const router = express.Router();
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, libraryCtrl.createBook);  
router.get('/', libraryCtrl.getAllBooks);
router.get('/:id', libraryCtrl.getOneBook);
router.put('/:id', auth, libraryCtrl.modifyBook);
router.delete('/:id', auth, libraryCtrl.deleteBook);

module.exports = router;
