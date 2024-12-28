const Admin = require("../models/Admin");

const loginAdmin = async (req, res) => {
    try {
      console.log("Admin Login Request Received:", req.body); // Log input data
  
      const { email, password } = req.body;
  
      // Check if email or password is missing
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required!" });
      }
  
      // Find admin by email
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        console.log("Admin not found!");
        return res.status(404).json({ message: "Admin not found!" });
      }
  
      // Validate password
      if (admin.password !== password) {
        console.log("Invalid credentials!");
        return res.status(401).json({ message: "Invalid credentials!" });
      }
  
      console.log("Admin logged in successfully!");
      res.status(200).json({ message: "Login successful!" });
    } catch (error) {
      console.error("Admin Login Error:", error);
      res.status(500).json({ message: "Server error occurred!" });
    }
  };
  
  module.exports = { loginAdmin };
  

module.exports = { loginAdmin };
