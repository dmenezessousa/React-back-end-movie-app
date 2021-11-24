const express = require('express');
const router = express.Router();

const {
    getAllFavoriteMovies,
    addMovie,
    deleteFavoriteMovie
} = require('./controller/movieController');

const {jwtMiddleware } = require('../common/shared/jwtMiddleware');


router.get("/get-all-movies",
    jwtMiddleware,
    getAllFavoriteMovies
);

router.post("/add-movie",
    jwtMiddleware,
    addMovie
);

router.delete("/delete-movie/:id",
    jwtMiddleware,
    deleteFavoriteMovie
);


module.exports = router;