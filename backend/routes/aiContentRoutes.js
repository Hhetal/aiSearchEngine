//aiContentroutes

const express = require("express");
const router = express.Router();
const AiContent = require("../models/AiContentModel");
const mongoose = require("mongoose");
//

// Add cache control middleware
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// POST /api/ai-content
router.post("/", async (req, res) => {
    try {
        const aiContentData = req.body;
        const aiContent = new AiContent(aiContentData);
        await aiContent.save();
        res.status(201).json({ message: "AI content created successfully", data: aiContent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/ai-content
router.get("/", async (req, res) => {
    try {
        console.log("Fetching all blogs...");
        const aiContents = await AiContent.find();
        console.log(`Found ${aiContents.length} blogs:`, aiContents.map(b => ({ id: b._id, title: b.title })));
        res.status(200).json(aiContents);
    } catch (error) {
        console.error("Error fetching all blogs:", error);
        res.status(500).json({ error: error.message });
    }
});

// GET /api/ai-content/:id
router.get("/:id", async (req, res) => {
    try {
        const blogId = req.params.id;
        console.log("\n=== Blog Fetch Request ===");
        console.log("Requested blog ID:", blogId);
        
        // Check database connection
        const dbState = mongoose.connection.readyState;
        console.log("Database connection state:", dbState, "(0=disconnected, 1=connected, 2=connecting, 3=disconnecting)");
        
        // Get all blogs first to see what's available
        const allBlogs = await AiContent.find({}, { _id: 1, title: 1 });
        console.log("\nAll blogs in database:", allBlogs.map(b => ({ id: b._id.toString(), title: b.title })));
        
        // Check if ID is valid MongoDB ObjectId
        const isValidId = mongoose.Types.ObjectId.isValid(blogId);
        console.log("\nIs ID valid MongoDB ObjectId?", isValidId);
        
        if (!isValidId) {
            console.log("Invalid blog ID format");
            return res.status(400).json({ message: "Invalid blog ID format" });
        }

        // Try to find the blog
        const aiContent = await AiContent.findOne({ _id: new mongoose.Types.ObjectId(blogId) });
        console.log("\nQuery result:", aiContent ? "Blog found" : "Blog not found");

        if (!aiContent) {
            console.log("Blog not found in database");
            return res.status(404).json({ message: "Blog not found" });
        }

        // Log success with blog info
        console.log("\nBlog details:", {
            id: aiContent._id.toString(),
            title: aiContent.title,
            type: aiContent.type
        });
        console.log("=== End of Request ===\n");

        res.status(200).json(aiContent);
    } catch (error) {
        console.error("\nError in GET /api/ai-content/:id:");
        console.error("Error type:", error.name);
        console.error("Error message:", error.message);
        console.error("Stack trace:", error.stack);

        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid blog ID format" });
        }

        res.status(500).json({ 
            message: "Server error", 
            error: error.message,
            details: error.name === 'CastError' ? 'Invalid ID format' : 'Internal server error'
        });
    }
});

// PUT /api/ai-content/:id
router.put("/:id", async (req, res) => {
    try {
        const aiContent = await AiContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!aiContent) return res.status(404).json({ message: "Content not found" });
        res.status(200).json({ message: "Content updated successfully", data: aiContent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/ai-content/:id
router.delete("/:id", async (req, res) => {
    try {
        const aiContent = await AiContent.findByIdAndDelete(req.params.id);
        if (!aiContent) return res.status(404).json({ message: "Content not found" });
        res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

