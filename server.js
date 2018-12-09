var express = require("express");
var handlebars = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

// scraping tools
var cheerio = require("cheerio");
var axios = require("axios");

// models
var db = require("./models");


var PORT = 3000;

// express
var app = express();


// morgan logger for logging requests
app.use(logger("dev"));

// parsing request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// public static folder
app.use(express.static("public"));

// connect to the Mongo DB

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

























// Start the server
// app.listen(PORT, function() {
//     console.log("App running on port " + PORT + "!");
//   });
  