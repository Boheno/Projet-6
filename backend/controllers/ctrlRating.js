const Books = require("../models/modelBooks");

/**
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.postRating = (req, res, next) => {
  const userId = req.auth.userId;
  const rating = req.body.rating;

  Books.findOne({ _id: req.params.id})
  .then(book => {
  const existingRating = book.ratings.find(r => r.userId === userId);
  book.ratings.push({ userId, grade: rating });

  const totalRatings = book.ratings.length;
  const sumRatings = book.ratings.reduce((sum, r) => sum + r.grade, 0);
  book.averageRating = sumRatings / totalRatings;

  book.save()
  .then(books => res.status(200).json(books))
  .catch(error => res.status(400).json({error}));
})
.catch(error => res.status(500).json({ error }));  
}

exports.getBestRatedBooks = (req, res, next) => {
    Books.find()
    .sort({averageRating: -1})
    .limit(3)
    .then(books => {
      res.status(200).json(books)
})
    .catch(error => {
      res.status(400).json({error})}
    );
   };