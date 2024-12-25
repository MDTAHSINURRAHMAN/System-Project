const express = require("express");
const router = express.Router();
const {
  createAdoptionRequest,
  paymentSuccess,
  paymentFail,
} = require("../controllers/adoptionController");

// Adoption Routes
router.post("/create-adoption", createAdoptionRequest); // Payment Initialization
router.get("/payment-success", paymentSuccess); // Payment Success
router.get("/payment-fail", paymentFail); // Payment Failure

module.exports = router;
