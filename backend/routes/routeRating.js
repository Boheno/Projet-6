const express = require('express');
const router = express.Router();

const bestRatingCtrl = require('../controllers/ctrlRating');

router.get('/bestRating', bestRatingCtrl.getBestRating);
// Si tu veux poster une note sur un livre, il faut passer l'id du livre dans la route pour pouvoir le récupérer
router.post('/:id/rating', bestRatingCtrl.postRating);

module.exports = router;