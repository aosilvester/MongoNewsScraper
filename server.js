var express = require("express");
var handlebars = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");


// scraping tools
var cheerio = require("cheerio");
var axios = require("axios");

// models
// var db = require("./models");


var PORT = process.env.PORT || 3000 ;

// express
var app = express();


// morgan logger for logging requests
app.use(logger("dev"));

// parsing request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// public static folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));


// handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/scrapeController.js");

app.use("/", routes);


// connect to the Mongo DB

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

var monDB = mongoose.connection;

monDB.on("error", function(error) {
    console.log("Mongoose Error: ", error);
  });
  
  // Once logged in to the db through mongoose, log a success message
monDB.once("open", function() {
    console.log("Mongoose connection successful.");
  });
  
  // Start the server
  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  
