const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const blogInteractionSchema = new mongoose.Schema({
  blogId: { type: String, required: true, unique: true },
  likes: { type: Number, default: 0 },
  comments: [commentSchema],
  isLiked: { type: Boolean, default: false },
  isBookmarked: { type: Boolean, default: false }
});

module.exports = mongoose.model('BlogInteraction', blogInteractionSchema); 