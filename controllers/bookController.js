const Book = require("../models/bookSchema");

// Controller to create a new book
const createBook = async (req, res) => {
    try {
        const {
            title,
            author,
            publicationHouse,
            publicationDate,
            genre,
            publicationYear,
        } = req.body;

        const newBook = new Book({
            title,
            author,
            publicationHouse,
            publicationDate,
            genre,
            publicationYear,
        });

        await newBook.save();

        res
            .status(201)
            .json({ message: "Book created successfully", book: newBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createBook }