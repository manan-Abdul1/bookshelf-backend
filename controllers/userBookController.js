const UserBook = require("../models/userBookSchema");

// Controller to add Book To Shelf
const addBookToShelf = async (req, res) => {
    try {
        const { userId, bookId, shelfId, status } = req.body;

        const existingUserBook = await UserBook.findOne({ userId, bookId });
        if (existingUserBook) {
            return res.status(400).json({ message: "Book already exists in shelf" });
        }

        const newUserBook = new UserBook({
            userId,
            bookId,
            shelfId,
            status,
        });
        await newUserBook.save();

        res.status(201).json(newUserBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Controller to update book status
const updateUserBookStatus = async (req, res) => {
    try {
        const { status, userId, bookId } = req.body;

        const userBook = await UserBook.findOneAndUpdate(
            { userId, bookId },
            { status },
            { new: true }
        );

        if (!userBook) {
            return res.status(404).json({ message: "User book entry not found" });
        }

        res.status(200).json(userBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllUserBooks = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const userBooks = await UserBook.find({ userId });
  
      res.status(200).json(userBooks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addBookToShelf, updateUserBookStatus, getAllUserBooks };
