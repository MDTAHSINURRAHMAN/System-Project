import axios from "axios";

const API_URL = "http://localhost:5000/api/pets";

// Fetch all pets
// Fetch pets with pagination
export const fetchPets = async (page = 1, limit = 5) => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pets:', error);
      throw error;
    }
  };
  

// Add a new pet
export const addPet = async (petData) => {
  // <-- Ensure this matches the function name
  try {
    const response = await axios.post(API_URL, petData);
    return response.data;
  } catch (error) {
    console.error("Error adding pet:", error);
    throw error;
  }
};

// Update a pet
export const updatePet = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating pet:', error);
      throw error;
    }
  };
  
  // Delete a pet
  export const deletePet = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting pet:', error);
      throw error;
    }
  };

  // Toggle adoption status
export const toggleAdoptionStatus = async (id, currentStatus) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        adopted: !currentStatus, // Toggle status
      });
      return response.data;
    } catch (error) {
      console.error('Error toggling adoption status:', error);
      throw error;
    }
  };
  
  
