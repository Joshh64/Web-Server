const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    director: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true
    }
});

const Movie = mongoose.model("movie", userSchema)

module.exports = Movie;