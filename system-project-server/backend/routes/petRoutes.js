const express = require("express");
const router = express.Router();
const {
  getPets,
  addPet,
  updatePet,
  deletePet,
  getPetById
} = require("../controllers/petController");

// Routes
router.get("/", getPets);
router.get("/:id", getPetById);
router.post("/", addPet);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);


module.exports = router;