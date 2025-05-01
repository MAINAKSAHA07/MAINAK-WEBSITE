require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogInteractionRoutes = require('./routes/blogInteractions');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/blog-interactions', blogInteractionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-interactions')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 