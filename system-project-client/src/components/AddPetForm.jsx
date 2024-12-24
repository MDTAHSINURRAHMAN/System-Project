import { useState } from "react";
import { addPet } from "../services/api"; // <-- Ensure this matches your api.js export

const AddPetForm = ({ refreshPets }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    species: "Dog",
    description: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await addPet(formData); // <-- Ensure this function is imported properly
      setSuccess("Pet added successfully!");
      setFormData({
        name: "",
        age: "",
        breed: "",
        species: "Dog",
        description: "",
        image: "",
      });
      refreshPets(); // Refresh pet list
    } catch (err) {
      setError("Failed to add pet. Please try again.");
    }
  };

  return (
    <div className="add-pet-form">
      <h2>Add New Pet</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={formData.breed}
          onChange={handleChange}
          required
        />
        <select name="species" value={formData.species} onChange={handleChange}>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
};

export default AddPetForm;
