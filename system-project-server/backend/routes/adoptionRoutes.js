const express = require("express");
const router = express.Router();
const { addAdoptionRequest, getAdoptionRequests } = require("../controllers/adoptionController");

// Adoption Routes
router.post("/", addAdoptionRequest); // Submit adoption request
router.get("/", getAdoptionRequests); // Fetch all adoption requests

module.exports = router;
