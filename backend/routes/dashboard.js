const express = require('express');
const router = express.Router();
const AiContent = require('../models/AiContentModel');

router.get('/', async (req, res) => {
  try {
    // Get total counts
    const totalTools = await AiContent.countDocuments();
    const freeTools = await AiContent.countDocuments({ priceType: "free" });
    const paidTools = await AiContent.countDocuments({ priceType: "paid" });

    // Get average rating
    const ratingStats = await AiContent.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          ratedCount: { 
            $sum: { $cond: [{ $gt: ["$rating", 0] }, 1, 0] }
          }
        }
      }
    ]);

    // Get tools by type
    const typeStats = await AiContent.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get monthly additions for the last 12 months
    const monthlyStats = await AiContent.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 12 }
    ]);

    // Get latest tools
    const latestTools = await AiContent.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Calculate month-over-month change
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const lastMonth = new Date(thisMonth);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const thisMonthCount = await AiContent.countDocuments({
      createdAt: { $gte: thisMonth }
    });

    const lastMonthCount = await AiContent.countDocuments({
      createdAt: { $gte: lastMonth, $lt: thisMonth }
    });

    const monthlyChange = lastMonthCount ? 
      ((thisMonthCount - lastMonthCount) / lastMonthCount * 100) : 
      0;

    res.json({
      totalTools,
      freeTools,
      paidTools,
      averageRating: ratingStats[0]?.averageRating || 0,
      ratedCount: ratingStats[0]?.ratedCount || 0,
      monthlyChange,
      typeStats: typeStats.map(stat => ({
        type: stat._id || 'Unknown',
        count: stat.count
      })),
      monthlyStats: monthlyStats.map(stat => ({
        month: new Date(stat._id.year, stat._id.month - 1, 1),
        count: stat.count
      })),
      latestTools: latestTools.map(tool => ({
        ...tool,
        _id: tool._id.toString(),
        createdAt: tool.createdAt.toISOString(),
        updatedAt: tool.updatedAt ? tool.updatedAt.toISOString() : tool.createdAt.toISOString()
      }))
    });
  } catch (error) {
    console.error('Dashboard route error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router; 