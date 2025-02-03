const express = require('express');
const router = express.Router();
const booksCtrl = require ("../controllers/ctrlBooks");
const bestRatingCtrl = require('../controllers/ctrlRating');
const auth = require('../middleware/auth');

//router.get('/bestRating', bestRatingCtrl.getBestRating);
router.get('/:id', booksCtrl.getOneBooks);
router.post('/:id/rating', auth, bestRatingCtrl.postRating);


module.exports = router;