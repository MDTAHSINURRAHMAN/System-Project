const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String, // URL for profile photo
    },
    acceptedByAdmin: {
      type: Boolean,
      default: false, // Initially false until approved by admin
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);
module.exports = Volunteer;
