// Exporting an object containing all of our models

console.log("connected to index.js");

module.exports = {
    Article: require("./article"),
    Note: require("./note")
  };
  