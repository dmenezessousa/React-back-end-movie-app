const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title:{type: String},
    moviePoster:{ type: String},
    imdbID:{type: String},
    movieOwner:{type: mongoose.Schema.ObjectId, ref: "user"},
},{timestamps : true,});

module.exports = mongoose.model("movies", movieSchema);