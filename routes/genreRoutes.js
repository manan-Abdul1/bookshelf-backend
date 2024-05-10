const express = require("express");
const { getAllGenres } = require("../controllers/genreContoller");
const router = express.Router();

router.get("/", getAllGenres);

module.exports = router;
