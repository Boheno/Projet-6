const express = require('express');

const router = express.Router();

const booksCtrl = require ("../controllers/ctrlBooks");
const auth = require('../middleware/auth');
const { upload, processImage } = require('../middleware/multer-config');

router.get('/', booksCtrl.getAllBooks );
router.post('/', auth, upload, processImage, booksCtrl.createBooks);
router.get('/:id', booksCtrl.getOneBooks);
router.put('/:id', auth, upload, processImage, booksCtrl.modifyBooks);
router.delete('/:id', auth, booksCtrl.deleteBooks);

module.exports = router;