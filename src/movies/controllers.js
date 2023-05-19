const Movie = require("./model")

const addMovie = async (req, res) => {
    try {
        await Movie.create ({
            title: req.body.title,
            director: req.body.director,
            genre: req.body.genre
        })
        
        res.status(201).json ({
            message: "Movie successfully added!",
            movie: req.body.title
        })
    } catch (error) {
        console.log(error)
    }
}

const getAllMovies = async (req, res) => {
    try {
        const findMovie = await Movie.findAll() // locates book user wanted to find
        
        res.status(200).json ({
            message: "Movies successfully found! Displaying list of currently logged movies",
            movie: findMovie
        })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
        console.log(error)
    }
}

const updateMovie = async (req, res) => {
    try {
        const update = await Movie.update({
            director: req.body.newDirector
        }, // update author
        {
            where: {
                title: req.body.title
            }
        }) // update author where the title is equal to the title passed in the request body

        res.status(200).json ({
            message: "Movie successfully updated!",
            updateResult: update
        })
    } catch {
        res.status(501).json({ errorMessage: error.message, error: error });
        console.log(error)
    }
}

const deleteMovie = async (req, res) => {
    try {
        const { title, deleteAll } = req.body;

        if (deleteAll) {
            await Movie.destroy({
                where: {},
                truncate: true
            }); // delete all movies

            res.status(200).json({
                message: "All movies successfully deleted!",
            });
        } else {
            const deleteMovie = await Book.destroy({
                where: {
                    title: title
                }
            }); // delete movie where the title is equal to the title passed in the request body

            if (deleteMovie === 0) {
                res.status(404).json({
                    message: "Movie not found!",
                });
            } else {
                res.status(200).json({
                    message: "Movie successfully deleted!",
                    book: deleteMovie
                });
            }
        }
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
        console.log(error)
    }
}

module.exports = {
    addMovie,
    getAllMovies,
    updateMovie,
    deleteMovie
}