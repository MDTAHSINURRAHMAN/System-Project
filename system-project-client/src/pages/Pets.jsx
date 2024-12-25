import React, { useEffect, useState } from "react";
import {
  fetchPets,
  deletePet,
  updatePet,
  toggleAdoptionStatus,
} from "../services/api";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPet, setEditingPet] = useState(null);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("");
  const [filterAge, setFilterAge] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch pets with pagination
  const loadPets = async (page = 1) => {
    try {
      const data = await fetchPets(page);
      setPets(data.data);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error("Error loading pets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPets(currentPage);
  }, [currentPage]);

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this pet?");
    if (confirm) {
      try {
        await deletePet(id);
        loadPets(currentPage);
      } catch (error) {
        console.error("Error deleting pet:", error);
      }
    }
  };

  // Handle edit
  const handleEditClick = (pet) => {
    setEditingPet(pet._id);
    setEditData(pet);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePet(editingPet, editData);
      setEditingPet(null);
      loadPets(currentPage);
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  // Toggle adoption status
  const handleToggleAdoption = async (id, status) => {
    try {
      await toggleAdoptionStatus(id, status);
      loadPets(currentPage);
    } catch (error) {
      console.error("Error toggling adoption status:", error);
    }
  };

  // Filter and search logic
  const filteredPets = pets.filter((pet) => {
    return (
      pet.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterSpecies ? pet.species === filterSpecies : true) &&
      (filterAge ? pet.age === parseInt(filterAge) : true)
    );
  });

  if (loading) {
    return <h2>Loading Pets...</h2>;
  }

  return (
    <div>
      <h2>All Pets</h2>

      {/* Search and Filter */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select
          value={filterSpecies}
          onChange={(e) => setFilterSpecies(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">All Species</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
        <input
          type="number"
          placeholder="Filter by Age"
          value={filterAge}
          onChange={(e) => setFilterAge(e.target.value)}
        />
      </div>

      {/* Pet List */}
      {filteredPets.length === 0 ? (
        <p>No pets match your criteria.</p>
      ) : (
        <ul>
          {filteredPets.map((pet) => (
            <li key={pet._id}>
              {editingPet === pet._id ? (
                // Edit Form
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="number"
                    name="age"
                    value={editData.age}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="breed"
                    value={editData.breed}
                    onChange={handleEditChange}
                    required
                  />
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    required
                  />
                  <button type="submit">Update</button>
                  <button onClick={() => setEditingPet(null)}>Cancel</button>
                </form>
              ) : (
                // Display Pet Details
                <div>
                  <h3>{pet.name}</h3>
                  <p>Species: {pet.species}</p>
                  <p>Breed: {pet.breed}</p>
                  <p>Age: {pet.age} years</p>
                  <p>Status: {pet.adopted ? "Adopted" : "Available"}</p>
                  <img
                    src={pet.image}
                    alt={pet.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <br />
                  <button onClick={() => handleEditClick(pet)}>Edit</button>
                  <button onClick={() => handleDelete(pet._id)}>Delete</button>
                  <button
                    onClick={() => handleToggleAdoption(pet._id, pet.adopted)}
                  >
                    {pet.adopted ? "Mark as Available" : "Mark as Adopted"}
                  </button>
                </div>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PetList;
