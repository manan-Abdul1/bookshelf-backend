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

        const userBook = await UserBook.findOne({ userId, bookId });

        if (!userBook) {
            return res.status(404).json({ ok: false, message: "User book entry not found" });
        }

        if (userBook.status === status) {
            return res.status(200).json({ ok: false, message: "Status is already updated" });
        }

        const updatedUserBook = await UserBook.findOneAndUpdate(
            { userId, bookId },
            { status },
            { new: true }
        );

        res.status(200).json({ ok: true, userBook: updatedUserBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Internal server error" });
    }
};

const getAllUserBooks = async (req, res) => {
    try {
      const userId = req.params.userId;
  
     const userBooks = await UserBook.find({ userId }).populate({
            path: 'bookId',
            populate: { path: 'genre' } 
        });  
      res.status(200).json(userBooks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteAllUsersBook = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const deletedUserBooks = await UserBook.deleteMany({ userId });
  
      if (deletedUserBooks.deletedCount === 0) {
        return res.status(404).json({ message: 'User book entries not found' });
      }
  
      res.status(200).json({ message: 'All user book entries deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addBookToShelf, updateUserBookStatus, getAllUserBooks, deleteAllUsersBook };
