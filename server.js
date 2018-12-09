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

// routes

// GET route
app.get("/scrape", function(req, res){
    // body of the html
    axios.get("/scrape", function (req, res){
        axios.get("http://www.nytimes.com/").then(function(response){
            var $ = cheerio.load(response.data);

            $("span.balancedHeadline").each(function(i, element) {
                var title = $(element).text();
                var link = $(element).attr("href");

                results.push({
                    title: title,
                    link: link
                });
                console.log(results);   

            });
            // console.log(results);   

        });
        // console.log(results);   

    })
    // console.log(results);   

})

























// Start the server
// app.listen(PORT, function() {
//     console.log("App running on port " + PORT + "!");
//   });
  