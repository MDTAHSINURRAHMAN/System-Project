const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String, // URL to the user's profile photo
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const User = mongoose.model("User", userSchema);
module.exports = User;
