const express = require("express");
const router = express.Router();
const { addBookToShelf,  updateUserBookStatus, getAllUserBooks, deleteAllUsersBook} = require("../controllers/userBookController");

router.post("/", addBookToShelf);
router.put("/", updateUserBookStatus);
router.get("/:userId", getAllUserBooks);
router.delete("/:userId", deleteAllUsersBook);

module.exports = router;
