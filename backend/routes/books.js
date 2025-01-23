const express = require('express');
const router = express.Router();

const booksCtrl = require ("../controllers/books");

router.get('/', booksCtrl.getAllBooks );
router.post('/', booksCtrl.createBooks);
router.get('/:id', booksCtrl.getOneBooks);
router.put('/:id', booksCtrl.modifyBooks);
router.delete('/:id', booksCtrl.deletBooks);

module.exports = router;