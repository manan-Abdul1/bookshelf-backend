const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now
  },
});

const Shelf = mongoose.model('Shelf', shelfSchema);

module.exports = Shelf;
