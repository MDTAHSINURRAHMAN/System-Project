import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPetById } from "../services/api";

const AdoptionProcess = () => {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    postCode: "",
  });

  useEffect(() => {
    const loadPetDetails = async () => {
      try {
        const data = await fetchPetById(id);
        setPet(data);
      } catch (err) {
        setError("Failed to fetch pet details.");
        console.error("Error fetching pet details:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPetDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adoption Form Submitted:", formData);
    alert("Adoption request submitted successfully!");
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side - Pet Details */}
      <div className="w-full lg:w-1/2 p-8">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-96 object-cover"
        />
        <h2 className="text-3xl font-bold mt-4">{pet.name}</h2>
        <p>Species: {pet.species}</p>
        <p>Breed: {pet.breed}</p>
        <p>Age: {pet.age} years</p>
        <p>Price: ${pet.price}</p>
        <p>Diet: {pet.diet}</p>
        <p>Vaccinated: {pet.vaccinated ? "Yes" : "No"}</p>
        <p>Potty Trained: {pet.pottyTrained ? "Yes" : "No"}</p>
        <p>Spayed/Neutered: {pet.spayedOrNeutered ? "Yes" : "No"}</p>
      </div>

      {/* Right Side - Adoption Form */}
      <div className="w-full lg:w-1/2 p-8 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Adoption Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="postCode"
            placeholder="Post Code"
            value={formData.postCode}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdoptionProcess;
