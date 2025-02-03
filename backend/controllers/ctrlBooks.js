const Books = require("../models/modelBooks");
const fs = require('fs');

exports.getAllBooks = (req, res, next) => {
    Books.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({error}));
  };

  exports.createBooks = (req, res, next) => {
    const booksObject = JSON.parse(req.body.book);
    delete booksObject._id;
    delete booksObject._userId;
    const books = new Books({
      ...booksObject,
      userId: req.auth.userId,
      imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    books.save()
    .then(() => res.status(201).json ({message: "Livre enregistré"}))
    .catch(error => res.status(400).json({error}));
  };

  exports.getOneBooks = (req, res, next) => {
    Books.findOne({ _id: req.params.id })
      .then(books => res.status(200).json(books))
      .catch(error => res.status(404).json({ error }));
  };

  exports.modifyBooks = (req, res, next) => {
      const booksObject = req.file ? {
          ...JSON.parse(req.body.book),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    
      delete booksObject._userId;
      Books.findOne({_id: req.params.id})
          .then((book) => {
              if (book.userId !== req.auth.userId) {
                  res.status(401).json({ message : 'Not authorized'});
              } else {
                  Books.updateOne({ _id: req.params.id}, { ...booksObject, _id: req.params.id})
                  .then(() => res.status(200).json({message : 'Livre modifié!'}))
                  .catch(error => res.status(401).json({ error }));
              }
          })
          .catch((error) => {
              res.status(400).json({ error });
          });
   };

  exports.deleteBooks = (req, res, next) => {
      Books.findOne({ _id: req.params.id})
          .then(book => {
              if (book.userId !== req.auth.userId) {
                  res.status(401).json({message: 'Not authorized'});
              } else {
                  const filename = book.imageUrl.split('/images/')[1];
                  fs.unlink(`images/${filename}`, () => {
                      Books.deleteOne({_id: req.params.id})
                          .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                          .catch(error => res.status(401).json({ error }));
                  });
              }
          })
          .catch( error => {
              res.status(500).json({ error });
          });
  };