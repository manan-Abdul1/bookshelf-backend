const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const dbconfig = require('./connection/db');
const authRoutes = require('./routes/authRoutes');
const genreRoutes = require('./routes/genreRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userBookRoutes = require('./routes/userBookRoutes');

const app = express();
const corsOptions = {
  origin: '*', // Add your frontend URLs here
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  optionsSuccessStatus: 200, // HTTP status code to respond with for successful OPTIONS requests
};
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/genre', genreRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/userBook', userBookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});