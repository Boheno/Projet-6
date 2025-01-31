const Books = require("../models/modelBooks");

 /* Dans un controlleur, on ne fait que recevoir et renvoyer des requêtes
    Si les données ont besoin d'un traitement spécifique, alors on passe par un service */

/* 
  exports.postRating = (req, res, next) => {
    const userId = req.auth.userId;
    const rating = req.body.ratings;
    Books.findOne({ _id: req.params.id})
    .then(book => { 
    const existingRating = book.ratings.find(r => r.userId === userId);
    book.ratings.push({ userId, grade: rating });

    const totalRatings = book.ratings.length;
    const sumRatings = book.ratings.reduce((sum, r) => sum + r.grade, 0);
    book.averageRating = sumRatings / totalRatings;

    book.save()
    .then(() => res.status(201).json ({message: "Note enregistrée"}))
    .catch(error => res.status(400).json({error}));
  })
  .catch(error => res.status(500).json({ error }));  
  };
*/

/**
 * Ici le FRONT te demande des données spécifiques, des notes, dans un array contenu dans un objet book
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.postRating = (req, res, next) => {
  // Tu récupères le userId et la note qu'il a mise au livre, ok
  const userId = req.auth.userId;
  const rating = req.body.ratings;

  // Tu recherches le bon livre en base de données, ok
  Books.findOne({ _id: req.params.id})
  console.log("coucou")
  .then(book => { 
    console.log(book)
  const existingRating = book.ratings.find(r => r.userId === userId);
  book.ratings.push({ userId, grade: rating });

  const totalRatings = book.ratings.length;
  const sumRatings = book.ratings.reduce((sum, r) => sum + r.grade, 0);
  book.averageRating = sumRatings / totalRatings;

  book.save()
  .then(() => res.status(201).json ({message: "Note enregistrée"}))
  .catch(error => res.status(400).json({error}));
})
.catch(error => res.status(500).json({ error }));  
}

exports.getBestRating = (req, res, next) => {
  console.log(req.params)
    Books.find({ _id: req.params.ratings})
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({error}));
  };