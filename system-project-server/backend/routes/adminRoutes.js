const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/adminController");

// Admin Login Route
router.post("/login", loginAdmin);

module.exports = router;
