require('dotenv').config();

// Import Mongoose and the Shelf model
const mongoose = require('mongoose');
const Shelf = require('./models/shelfSchema');
var mongoURL = process.env.DB_URL;

// Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the initial shelves data
const initialShelves = [
  { name: 'Completed' },
  { name: 'Plan to Read' },
  { name: 'Reading' }
];

// Function to seed initial shelves
const seedInitialShelves = async () => {
  try {
    // Remove existing shelves (optional)
    await Shelf.deleteMany({});

    // Insert initial shelves
    const insertedShelves = await Shelf.insertMany(initialShelves);
    console.log('Initial shelves seeded successfully:', insertedShelves);
  } catch (error) {
    console.error('Error seeding initial shelves:', error);
  } finally {
    // Close MongoDB connection
    mongoose.disconnect();
  }
};

// Seed initial shelves
seedInitialShelves();
