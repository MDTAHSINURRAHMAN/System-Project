const Pet = require("../models/Pet");

// Get All Pets with Pagination
const getPets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // Default limit = 5 pets per page
    const skip = (page - 1) * limit; // Calculate how many to skip

    const pets = await Pet.find().skip(skip).limit(limit);
    const totalPets = await Pet.countDocuments(); // Total count

    res.status(200).json({
      totalPages: Math.ceil(totalPets / limit), // Total pages
      currentPage: page,
      data: pets,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add New Pet
const addPet = async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Pet Info
const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Pet
const deletePet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Pet by ID
const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPets,
  getPetById, // <-- Export here
  addPet,
  updatePet,
  deletePet,
};
