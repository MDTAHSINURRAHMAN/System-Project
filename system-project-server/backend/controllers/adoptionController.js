const AdoptionRequest = require("../models/AdoptionRequest");

// Add Adoption Request
const addAdoptionRequest = async (req, res) => {
  try {
    const adoptionRequest = new AdoptionRequest(req.body);
    await adoptionRequest.save();
    res
      .status(201)
      .json({ message: "Adoption request submitted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to submit adoption request", error });
  }
};

// Get All Adoption Requests
const getAdoptionRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find().populate("petId");
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch adoption requests", error });
  }
};

module.exports = { addAdoptionRequest, getAdoptionRequests };
