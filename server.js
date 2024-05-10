const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const dbconfig = require('./connection/db');
const authRoutes = require('./routes/authRoutes');
const genreRoutes = require('./routes/genreRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/genre', genreRoutes);
app.use('/api/book', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});