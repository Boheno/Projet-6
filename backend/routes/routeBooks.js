const express = require('express');

const router = express.Router();

const booksCtrl = require ("../controllers/ctrlBooks");
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', booksCtrl.getAllBooks );
router.post('/', auth, multer, booksCtrl.createBooks);
router.get('/:id', booksCtrl.getOneBooks);
router.put('/:id', auth, multer, booksCtrl.modifyBooks);
router.delete('/:id', auth, booksCtrl.deleteBooks);

module.exports = router;