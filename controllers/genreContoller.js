const GENRE = require("../models/genreSchema");

// Controller to get all Genre
const getAllGenres = async (req, res) => {
    try {
        const genre = await GENRE.find();
        res.status(200).json(genre);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllGenres }