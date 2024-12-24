import { useState, useEffect } from "react";
import PetList from "../components/PetList";
import AddPetForm from "../components/AddPetForm"; // <-- Import the form
import { fetchPets } from "../services/api";

const Pets = () => {
  const [pets, setPets] = useState([]);

  const loadPets = async () => {
    try {
      const data = await fetchPets();
      setPets(data);
    } catch (error) {
      console.error("Failed to load pets:", error);
    }
  };

  useEffect(() => {
    loadPets();
  }, []);

  return (
    <div>
      <h1>Pets Available for Adoption</h1>
      <AddPetForm refreshPets={loadPets} /> {/* <-- Render the form */}
      <PetList pets={pets} />
    </div>
  );
};

export default Pets;
