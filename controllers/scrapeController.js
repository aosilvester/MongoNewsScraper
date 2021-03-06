var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var axios = require("axios");

var router = express.Router();

var Note = require("../models/note.js");
var Article = require("../models/article.js");

var db = require("../models");


var request = require("request");


console.log("connected to the scrape controller");


// routes
router.get("/", function (req, res) {
    // res.render("index");
    // GET all articles
    db.Article.find({})
    .then(function(dbArticle){
        console.log(dbArticle.length);
        res.render("index", {articles: dbArticle});
    })
    // create handlebars object
    // res.render(index, handlebars object)
});

router.get("/savedarticles", function (req, res) {
    // res.render("savedArticles", function(){
    //     db.Article.find({})
    //     .then(function (dbArticle) {
    //         // If we were able to successfully find Articles, send them back to the client
    //         res.json(dbArticle);
    //     })
    //     .catch(function (err) {
    //         // If an error occurred, send it to the client
    //         res.json(err);
    //     });
    // });
})
// GET route

// post
router.post("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://www.nytimes.com").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        var articlesNYT = [];
        // Now, we grab every h2 within an article tag, and do the following:
        $("h2.css-bzeb53").each(function (i, element) {
            // Save an empty result object
            var result = {}

            // 

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                // .children("a")
                .text();
            result.link = $(this)
                .parent()
                .parent()
                .attr("href");
            result.summary = $(this)
                .parent()
                .parent()
                .children("ul.css-1rrs2s3")
                .text("li");

            // console.log(result);
            // push result to articlesNYT array
            articlesNYT.push(result);

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    // console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });

        // Send a message to the client

        console.log(articlesNYT);
        res.send("Scrape Complete");
        // res.render("index", {articles: articlesNYT});
    });
});
// res.render(console.log("hello"));


// Route for getting all Articles from the db
router.get("/articles", function (req, res) {
    // res.render("articles");
});

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({
            _id: req.params.id
        })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (dbArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Note
router.post("/articles/:id", function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
        .then(function (dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                note: dbNote._id
            }, {
                new: true
            });
        })
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});



// Export routes for server.js to use.
module.exports = router;