const express = require('express');
const router = express.Router();
const AiContent = require('../models/AiContentModel');

// GET /api/aicontent - Get paginated AI content with search
router.get('/', async (req, res) => {
  try {
    const { q = '', page = 1 } = req.query;
    const ITEMS_PER_PAGE = 10;
    const regex = new RegExp(q, 'i');

    // Get total counts
    const count = await AiContent.countDocuments({ title: { $regex: regex } });

    // Get paginated results
    const aiContents = await AiContent.find({ title: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEMS_PER_PAGE)
      .skip(ITEMS_PER_PAGE * (Number(page) - 1))
      .lean();

    // Format the data
    const formattedAiContents = aiContents.map(content => ({
      _id: content._id.toString(),
      title: content.title,
      description: content.description,
      priceType: content.priceType,
      type: content.type,
      rating: content.rating,
      createdAt: content.createdAt?.toISOString(),
      imageUrl: content.imageUrl
    }));

    res.json({
      count,
      aiContents: formattedAiContents
    });
  } catch (error) {
    console.error('Error fetching AI content:', error);
    res.status(500).json({ error: 'Failed to fetch AI content' });
  }
});

module.exports = router; 