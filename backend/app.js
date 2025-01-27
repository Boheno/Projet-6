const express = require('express');
const mongoose = require("mongoose");
const username = encodeURIComponent("Boheno");
const password = encodeURIComponent("R@S9m95NU-Uk-sG");
const cluster = "projet-6.ps6br.mongodb.net";
const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
const path = require('path');

const booksRoutes = require("./routes/routeBooks");
const userRoutes = require('./routes/routeUser');

mongoose.connect(uri);

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use("/api/books", booksRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

 module.exports = app;
 