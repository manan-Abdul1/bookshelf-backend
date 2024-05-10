require('dotenv').config();
const mongoose = require('mongoose');
const Genre = require('./models/genreSchema');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the initial genres data
const initialGenres = [
  { name: 'Fiction' },
  { name: 'Mystery' },
  { name: 'Romance' },
  { name: 'Thriller' },
];

// Function to seed initial genres
const seedInitialGenres = async () => {
  try {
    await Genre.deleteMany({});

    const insertedGenres = await Genre.insertMany(initialGenres);
    console.log('Initial genres seeded successfully:', insertedGenres);
  } catch (error) {
    console.error('Error seeding initial genres:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Seed initial genres
seedInitialGenres();
