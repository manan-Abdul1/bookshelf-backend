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
  
module.exports = { addBookToShelf };
