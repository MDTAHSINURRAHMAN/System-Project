import { useState } from "react";
import { addPet } from "../services/api"; // <-- Ensure this matches your api.js export

const AddPetForm = ({ refreshPets }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    price: "", // Added price field
    vaccinated: false,
    pottyTrained: false,
    diet: "",
    breed: "",
    gender: "Male",
    spayedOrNeutered: false,
    photo: "",
    species: "Cat", // Default species
    description: "", // Added description field
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log("Form Data Sent:", formData); // Debug log
      await addPet(formData); // <-- Ensure this function is imported properly
      setSuccess("Pet added successfully!");
      setFormData({
        name: "",
        age: "",
        price: "",
        vaccinated: false,
        pottyTrained: false,
        diet: "",
        breed: "",
        gender: "Male",
        spayedOrNeutered: false,
        photo: "",
        species: "Cat",
        description: "",
      });
      refreshPets(); // Refresh pet list
    } catch (err) {
      setError("Failed to add pet. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            Add New Cat for Adoption
          </h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full col-span-2"
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
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="diet"
              placeholder="What it eats"
              value={formData.diet}
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
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="select select-bordered w-full col-span-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              value={formData.photo}
              onChange={handleChange}
              required
              className="input input-bordered w-full col-span-2"
            />
            <select
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="select select-bordered w-full col-span-2"
            >
              <option value="Cat">Cat</option>
              <option value="Dog">Dog</option>
            </select>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="textarea textarea-bordered w-full col-span-2"
            ></textarea>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="vaccinated"
                  checked={formData.vaccinated}
                  onChange={handleChange}
                  className="checkbox"
                />
                <span>Vaccinated</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="pottyTrained"
                  checked={formData.pottyTrained}
                  onChange={handleChange}
                  className="checkbox"
                />
                <span>Potty Trained</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="spayedOrNeutered"
                  checked={formData.spayedOrNeutered}
                  onChange={handleChange}
                  className="checkbox"
                />
                <span>Spayed/Neutered</span>
              </label>
            </div>
            <button
              type="submit"
              className="btn bg-customRed text-white w-full col-span-2"
            >
              Add Pet
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div
        className="w-full lg:w-1/2 hidden lg:flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: "url(https://source.unsplash.com/800x600/?cat)",
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
