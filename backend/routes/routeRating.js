const express = require('express');
const router = express.Router();
const ratingCtrl = require('../controllers/ctrlRating');
const auth = require('../middleware/auth');

router.get('/bestrating', ratingCtrl.getBestRatedBooks);
router.post('/:id/rating', auth, ratingCtrl.postRating);

module.exports = router;