const Volunteer = require("../models/Volunteer");

// Volunteer Registration
const registerVolunteer = async (req, res) => {
  const { name, email, password, photo } = req.body;

  try {
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ message: "Volunteer already exists!" });
    }

    const newVolunteer = new Volunteer({
      name,
      email,
      password, // Add bcrypt hash in real scenarios
      photo,
      acceptedByAdmin: false,
    });

    await newVolunteer.save();

    res.status(201).json({
      message: "Volunteer registered successfully!",
      acceptedByAdmin: newVolunteer.acceptedByAdmin,
    });
  } catch (error) {
    console.error("Error registering volunteer:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// Volunteer Login
const loginVolunteer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) {
      return res.status(400).json({ message: "Volunteer not found!" });
    }

    if (!volunteer.acceptedByAdmin) {
      return res.status(403).json({ message: "Waiting for admin approval." });
    }

    if (volunteer.password !== password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Error logging in volunteer:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// Fetch Pending Volunteers
const getVolunteerRequests = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ acceptedByAdmin: false });
    res.status(200).json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteer requests:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// Fetch Accepted Volunteers
const getAcceptedVolunteers = async (req, res) => {
  try {
    const acceptedVolunteers = await Volunteer.find({ acceptedByAdmin: true });
    res.status(200).json(acceptedVolunteers);
  } catch (error) {
    console.error("Error fetching accepted volunteers:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// Approve Volunteer
const approveVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { acceptedByAdmin: true },
      { new: true }
    );
    res.status(200).json({ message: "Volunteer approved!", volunteer });
  } catch (err) {
    console.error("Error approving volunteer:", err);
    res.status(500).json({ message: "Failed to approve volunteer!" });
  }
};

// Reject Volunteer
const rejectVolunteer = async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Volunteer rejected!" });
  } catch (err) {
    console.error("Error rejecting volunteer:", err);
    res.status(500).json({ message: "Failed to reject volunteer!" });
  }
};

module.exports = {
  registerVolunteer,
  loginVolunteer,
  getVolunteerRequests,
  getAcceptedVolunteers,
  approveVolunteer,
  rejectVolunteer,
};
