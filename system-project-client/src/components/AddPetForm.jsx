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
    <div className="flex min-h-screen">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Add New Pet</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="breed"
              placeholder="Breed"
              value={formData.breed}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
            <select
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="textarea textarea-bordered w-full"
            ></textarea>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn bg-customRed text-white w-full">
              Add Pet
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div
        className="w-1/2 hidden lg:flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: "url(https://source.unsplash.com/800x600/?animal)",
        }}
      >
        <div className="absolute inset-0 bg-red-500 opacity-50"></div>
        <div className="text-white p-10 relative">
          <h1 className="text-4xl font-bold mb-4">Add Your Furry Friend!</h1>
          <p className="mb-6">
            Every pet deserves a loving home. Fill out the form and help us
            connect them to the perfect family.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddPetForm;
