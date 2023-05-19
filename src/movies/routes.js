const { Router } = require("express")
const movieRouter = Router()
const { addMovie, getAllMovies, updateMovie, deleteMovie } = require("./controllers")

movieRouter.post("/movies/addMovie", addMovie)
movieRouter.get("/movies/getAllMovies", getAllMovies)
movieRouter.put("/movies/updateMovie", updateMovie)
movieRouter.delete("/movies/deleteMovie", deleteMovie)

module.exports = movieRouter
