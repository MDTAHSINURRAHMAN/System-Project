const mongoose = require("mongoose");

// Schema for Pet
const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  price: {
    type: Number, // Added price field
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true, // Dog or Cat
  },
  description: {
    type: String,
  },
  image: {
    type: String, // URL to image
  },
  vaccinated: {
    type: Boolean,
    default: false,
  },
  pottyTrained: {
    type: Boolean,
    default: false,
  },
  diet: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  spayedOrNeutered: {
    type: Boolean,
    default: false,
  },
  adopted: {
    type: Boolean,
    default: false,
  },
});

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
