const mongoose = require('mongoose');

const UserBookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
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
