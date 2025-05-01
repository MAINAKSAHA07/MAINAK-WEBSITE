const express = require('express');
const router = express.Router();
const BlogInteraction = require('../models/BlogInteraction');

// Get blog interactions
router.get('/:blogId', async (req, res) => {
  try {
    const interaction = await BlogInteraction.findOne({ blogId: req.params.blogId });
    if (!interaction) {
      return res.status(404).json({ message: 'Blog interactions not found' });
    }
    res.json(interaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update likes
router.patch('/:blogId/like', async (req, res) => {
  try {
    const { isLiked } = req.body;
    const interaction = await BlogInteraction.findOne({ blogId: req.params.blogId });
    
    if (!interaction) {
      const newInteraction = new BlogInteraction({
        blogId: req.params.blogId,
        likes: isLiked ? 1 : 0,
        isLiked
      });
      await newInteraction.save();
      return res.json(newInteraction);
    }

    interaction.likes = isLiked ? interaction.likes + 1 : interaction.likes - 1;
    interaction.isLiked = isLiked;
    await interaction.save();
    res.json(interaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add comment
router.post('/:blogId/comments', async (req, res) => {
  try {
    const { author, content } = req.body;
    const interaction = await BlogInteraction.findOne({ blogId: req.params.blogId });
    
    if (!interaction) {
      const newInteraction = new BlogInteraction({
        blogId: req.params.blogId,
        comments: [{ author, content }]
      });
      await newInteraction.save();
      return res.json(newInteraction);
    }

    interaction.comments.push({ author, content });
    await interaction.save();
    res.json(interaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update bookmark status
router.patch('/:blogId/bookmark', async (req, res) => {
  try {
    const { isBookmarked } = req.body;
    const interaction = await BlogInteraction.findOne({ blogId: req.params.blogId });
    
    if (!interaction) {
      const newInteraction = new BlogInteraction({
        blogId: req.params.blogId,
        isBookmarked
      });
      await newInteraction.save();
      return res.json(newInteraction);
    }

    interaction.isBookmarked = isBookmarked;
    await interaction.save();
    res.json(interaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 