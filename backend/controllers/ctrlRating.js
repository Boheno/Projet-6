const Books = require("../models/modelBooks");

 /* Dans un controlleur, on ne fait que recevoir et renvoyer des requêtes
    Si les données ont besoin d'un traitement spécifique, alors on passe par un service */
/**
 * Ici le FRONT demande des données spécifiques, des notes, dans un array contenu dans un objet book
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.postRating = (req, res, next) => {
  // On récupère le userId et la note qu'il a mise au livre
  const userId = req.auth.userId;
  const rating = req.body.rating;
 

  // on recherches le bon livre en base de données
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

//exports.getBestRating = (req, res, next) => {
 // console.log(req.params)
  //  Books.find({ _id: req.params.ratings})
  //  .then(books => res.status(200).json(books))
  //  .catch(error => res.status(400).json({error}));
 // };