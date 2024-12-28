const express = require("express");
const router = express.Router();
const {
  registerVolunteer,
  loginVolunteer,
  getVolunteerRequests,
  approveVolunteer,
  rejectVolunteer,
  getAcceptedVolunteers,
} = require("../controllers/volunteerController");

// Volunteer Routes
router.post("/register", registerVolunteer); // Register Route
router.post("/login", loginVolunteer);       // Login Route
router.get("/requests", getVolunteerRequests);
// Fetch Accepted Volunteers
router.get("/accepted", getAcceptedVolunteers);
router.put("/approve/:id", approveVolunteer);


// Reject Volunteer
router.delete("/reject/:id", rejectVolunteer);


module.exports = router;
