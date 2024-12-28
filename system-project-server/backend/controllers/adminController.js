const Admin = require("../models/Admin");

// Admin Login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    // Check if password matches
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    res.status(200).json({ message: "Admin logged in successfully!" });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = { adminLogin };
