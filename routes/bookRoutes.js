const express = require("express");
const router = express.Router();
const { createBook, getAllBooks, getBookById, deleteBook, deleteAllBooks } = require("../controllers/bookController");

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.delete("/:id", deleteBook);

module.exports = router;
