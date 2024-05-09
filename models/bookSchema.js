const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publicationHouse: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationYear: {
    type: Number,
    required: true,
  },
  createdAt: { 
    type: Date, 
    default: Date.now
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
