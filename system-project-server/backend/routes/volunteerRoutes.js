const express = require("express");
const router = express.Router();
const {
  registerVolunteer,
  loginVolunteer,
  approveVolunteer,
  getAllVolunteers,
} = require("../controllers/volunteerController");

// Volunteer Routes
router.post("/register", registerVolunteer); // Register Route
router.post("/login", loginVolunteer);       // Login Route

module.exports = router;
