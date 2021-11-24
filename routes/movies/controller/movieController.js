const Movies = require('../model/Movie');
const User = require('../../users/model/User');
// const errorHandler = require('../../utils/errorHandler/errorHandler');

async function getAllFavoriteMovies(req,res){
    try{
        const decodedData = res.locals.decodedData;

        let foundUser = await User.findOne({email: decodedData.email});

        let allFavoriteMovies = await Movies.find({user: foundUser._id});

        res.json({message: "Success", payload: allFavoriteMovies});
    }catch(e){
        res.status(500).json(errorHandler(e));
    }
    
};

async function addMovie (req,res){
    const {title, moviePoster,imdbID}= req.body;

    try {
            const decodedData = res.locals.decodedData;

            let foundUser = await User.findOne({email: decodedData.email});

            const createdMovie = new Movies({
                title,
                moviePoster,
                imdbID,
                MovieOwner: foundUser._id,
            })

            let savedMovie = await createdMovie.save();

            foundUser.movieHistory.push(savedMovie._id);

            await foundUser.save();

            return res.json({message: "Success", savedMovie});
    }catch(e){
        res.status(500).json(errorHandler(e));
    }
}


async function deleteFavoriteMovie(req,res){
    try{
        let deletedMovie = await Movies.findByIdAndRemove(req.params.id);

        if(!deletedMovie){
            return res.status(404).json({message: "Error", error: "Movie not found"});
        }else{
            const decodedData = res.locals.decodedData;

        let foundUser = await User.findOne({email: decodedData.email});

        let userMovies = foundUser.movieHistory;

        let userMoviesHistory = userMovies.filter(
            (item) => item._id.toString() !== req.params.id
        );

        foundUser.movieHistory = userMoviesHistory;

        await foundUser.save();

        res.json({message: "Deleted", payload: deletedMovie});
        }

    }catch(e){
        res.status(500).json(errorHandler(e));
    }
};

module.exports = {
    getAllFavoriteMovies,
    addMovie,
    deleteFavoriteMovie
};