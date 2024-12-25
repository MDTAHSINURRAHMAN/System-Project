const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const SSLCommerzPayment = require('sslcommerz-lts')
const cors = require("cors");

// App Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false //true for live, false for sandbox

// Routes
const petRoutes = require("./routes/petRoutes");
const userRoutes = require("./routes/userRoutes"); 
const adoptionRoutes = require("./routes/adoptionRoutes");// Added user routes

app.use("/api/pets", petRoutes);
app.use("/api/users", userRoutes);
app.use("/api/adoptions", adoptionRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Pet Adoption System API is running...");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
