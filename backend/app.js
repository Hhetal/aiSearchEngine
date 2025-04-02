const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const connectDB = require('./db'); 
const aiContentRoutes = require("./routes/aiContentRoutes");
const dotenv = require("dotenv");
const indexRoutes = require("./routes/indexRoutes");

dotenv.config();
const app = express();

// Configure CORS with specific options
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Increase the JSON payload limit to 10MB
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

connectDB();

//route prefixes
app.use("/api/ai-content", aiContentRoutes);  
app.use("/api/users", indexRoutes); 

app.get("/", (req, res) => {
  res.send("Welcome to My API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));