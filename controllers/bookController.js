const Book = require("../models/bookSchema");
const UserBook = require("../models/userBookSchema");

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
            imageUrl,
            userId,
        } = req.body;

        const newBook = new Book({
            title,
            author,
            publicationHouse,
            publicationDate,
            genre,
            imageUrl,
            publicationYear,
        });

        await newBook.save();

        const newUserBook = new UserBook({
            userId,
            bookId: newBook._id,
        });

        // Save the new user book entry
        await newUserBook.save();
        res
            .status(201)
            .json({ ok: true, message: "Book created successfully", book: newBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Internal server error" });
    }
};

// Controller to get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ books, ok: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Internal server error" });
    }
};

// Controller to get a book by ID
const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Internal server error" });
    }
};

// Controller to delete a book by ID
const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ ok: false, message: "Book not found" });
        }

        res
            .status(200)
            .json({
                ok: true,
                message: "Book deleted successfully",
                book: deletedBook,
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Internal server error" });
    }
};

module.exports = { createBook, getAllBooks, getBookById, deleteBook };
