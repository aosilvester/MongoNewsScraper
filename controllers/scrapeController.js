
var express = require("express");

var router = express.Router();

var request = require("request");

var cheerio = require("cheerio");

var mongoose = require("mongoose");



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
