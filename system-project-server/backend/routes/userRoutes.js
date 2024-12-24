const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// Register User Route
router.post("/register", async (req, res) => {
  const { uid, name, email, password, photo } = req.body;

  // Debug Logs
  console.log("Request Body:", req.body); // Check data from frontend

  try {


    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists."); // Debug log for existing user
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      uid, // Store Firebase UID
      name,
      email,
      password: hashedPassword,
      photo,
    });

    await user.save(); // Save to MongoDB
    console.log("User saved to MongoDB.");

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("MongoDB Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
