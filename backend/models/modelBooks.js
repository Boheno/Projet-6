const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    userId: { type: String, required: true },
    grade: { type: Number, required: true },
  });

const bookSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    imageUrl: {type: String, required: false},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    ratings: {type: [ratingSchema], required: true},
    averageRating:{type: Number, required: true},
});

module.exports = mongoose.model('Books', bookSchema);