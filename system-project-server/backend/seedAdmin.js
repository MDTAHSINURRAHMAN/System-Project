const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin"); // Path to Admin model

dotenv.config();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

const createAdmin = async () => {
  try {
    const email = "admin@gmail.com"; // Replace with your desired admin email
    const password = "admin"; // Replace with your desired admin password

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists!");
      process.exit();
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    console.log("Admin created successfully!");
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
