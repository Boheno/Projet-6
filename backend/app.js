const express = require('express');
const books = require("../public/data/data.json");
const mongoose = require("mongoose");
const username = encodeURIComponent("Boheno");
const password = encodeURIComponent("R@S9m95NU-Uk-sG");
const cluster = "projet-6.ps6br.mongodb.net";
const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
const Books = require("./models/Books");

mongoose.connect(uri);

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.post('/api/books', (req, res, next) => {
    delete req.body._id;
    const Books = new Books({
      ...req.body
    });
    Books.save()
    .then(() => res.status(201).json ({message: "Livre enregistré"}))
    .catch(error => res.status(400).json({error}));
  });

  app.use('/api/books', (req, res, next) => {
    Books.find()
    .then(Books => res.status(200).json(Books))
    .catch(error => res.status(400).json({error}));
  });

module.exports = app;