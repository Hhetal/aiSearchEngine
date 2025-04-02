const userModel = require("../models/userModel");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middleware/authMiddleware');
require("dotenv").config();

//SIGNUP ROUTE
router.post("/signUp", async (req, res) => {
  let { username, name, email, password } = req.body;
  let user = await userModel.findOne({ email: email });

  if (user) {
    return res.json({ success: false, msg: "Email already exists" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await userModel.create({
      username: username,
      name: name,
      email: email,
      password: hashedPassword,
    });

    return res.json({ success: true, msg: "User created successfully" });
  }
});

//LOGIN ROUTE
// router.post("/login", async (req, res) => {
//   let { email, password } = req.body;
//   let user = await userModel.findOne({ email: email });

//   if (!user) {
//     return res.json({ success: false, msg: "User not found" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (isMatch) {
//     return res.json({ success: true, msg: "Login successful", user });
//   } else {
//     return res.json({ success: false, msg: "Invalid credentials" });
//   }
// });

//FETCH USER NAME (GET IN NAVBAR)
// Route to fetch all users
// router.get('/usersName', async (req, res) => {
//   try {
//       const users = await userModel.find({}, 'name'); // Fetch only 'name' field
//       res.json(users);
//   } catch (error) {
//       res.status(500).json({ message: 'Server Error', error });
//   }
// });




// Get logged-in user details
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



router.post("/login", async (req, res) => {
  try {
    console.log("Login request received:", req.body); // Log request data

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });

  } catch (error) {
    console.error("🔥 Login Error:", error); // Log full error
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;
