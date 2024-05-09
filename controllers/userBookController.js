const UserBook = require("../models/userBookSchema");

// Controller to add Book To Shelf
const addBookToShelf = async (req, res) => {
    try {
        const { userId, bookId, shelfId } = req.body;

        const newUserBook = new UserBook({
            userId,
            bookId,
            shelfId,
        });

        await newUserBook.save();

        res
            .status(201)
            .json({
                message: "Book added to shelf successfully",
                newUserBook,
                ok: true,
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addBookToShelf };
