
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var axios = require("axios");

var router = express.Router();

// var db = require("./models");

var app = express();

var request = require("request");


console.log("connected to the scrape controller");


// routes
router.get("/", function(req, res) {
    res.render("index");
  });
// GET route

// post
// app.get("/scrape", function(req, res) {
//     // First, we grab the body of the html with axios
//     axios.get("http://www.nytimes.com").then(function(response) {
//       // Then, we load that into cheerio and save it to $ for a shorthand selector
//       var $ = cheerio.load(response.data);
  
//       // Now, we grab every h2 within an article tag, and do the following:
//       $("h2.css-bzeb53").each(function(i, element) {
//         // Save an empty result object
//         var result = {};
  
//         // 
  
//         // Add the text and href of every link, and save them as properties of the result object
//         result.title = $(this)
//           // .children("a")
//           .text();
//         result.link = $(this)
//         .parent()
//         .parent()
//         .attr("href");
  
//         // Create a new Article using the `result` object built from scraping
//         db.Article.create(result)
//           .then(function(dbArticle) {
//             // View the added result in the console
//             console.log(dbArticle);
//           })
//           .catch(function(err) {
//             // If an error occurred, log it
//             console.log(err);
//           });
//       });
  
//       // Send a message to the client
//       res.send("Scrape Complete");
//     });
//   });
// Export routes for server.js to use.
module.exports = router;