const express = require("express");
const router = express.Router();
const { addBookToShelf,  updateUserBookStatus, getAllUserBooks, deleteAllUsersBook} = require("../controllers/userBookController");

router.get("/getAllBooks/:userId", getAllUserBooks);
router.post("/", addBookToShelf);
router.put("/", updateUserBookStatus);
router.delete("/:userId", deleteAllUsersBook);

module.exports = router;
