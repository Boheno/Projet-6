const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const booksCtrl = require ("../controllers/ctrlBooks");

router.get('/', auth, booksCtrl.getAllBooks );
router.post('/', auth, booksCtrl.createBooks);
router.get('/:id', auth, booksCtrl.getOneBooks);
router.put('/:id', auth, booksCtrl.modifyBooks);
router.delete('/:id',auth, booksCtrl.deletBooks);

module.exports = router;