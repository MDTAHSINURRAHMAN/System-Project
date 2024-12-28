const Volunteer = require("../models/Volunteer");

// Volunteer Registration
const registerVolunteer = async (req, res) => {
  const { name, email, password, photo } = req.body;

  try {
    // Check if volunteer already exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ message: "Volunteer already exists!" });
    }

    // Create new volunteer with acceptedByAdmin set to false by default
    const newVolunteer = new Volunteer({
      name,
      email,
      password, // Add bcrypt hash in real scenarios
      photo,
      acceptedByAdmin: false,
    });

    await newVolunteer.save();

    res.status(201).json({
      message: "Volunteer registered successfully!",
      acceptedByAdmin: newVolunteer.acceptedByAdmin,
    });
  } catch (error) {
    console.error("Error registering volunteer:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// Volunteer Login
const loginVolunteer = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if volunteer exists
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) {
      return res.status(400).json({ message: "Volunteer not found!" });
    }

    // Check if volunteer is accepted by admin
    if (!volunteer.acceptedByAdmin) {
      return res.status(403).json({ message: "Waiting for admin approval." });
    }

    // Check password (In real implementation, compare hashed passwords)
    if (volunteer.password !== password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Error logging in volunteer:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = { registerVolunteer, loginVolunteer };
