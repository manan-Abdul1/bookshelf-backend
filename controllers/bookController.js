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

// Controller to get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get a book by ID
const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to delete a book by ID
const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createBook, getAllBooks, getBookById, deleteBook }