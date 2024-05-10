const mongoose = require('mongoose');

const UserBookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  status: {
    type: String,
    enum: ['Reading', 'Completed', 'PlanToRead'],
    default: 'PlanToRead'
  },
  createdAt: { 
    type: Date, 
    default: Date.now
  }
});

const UserBook = mongoose.model('UserBook', UserBookSchema);

module.exports = UserBook;
