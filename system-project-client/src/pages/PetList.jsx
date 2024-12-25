import React, { useEffect, useState } from "react";
import {
  fetchPets,
  deletePet,
  updatePet,
  toggleAdoptionStatus,
} from "../services/api";
import { useNavigate } from "react-router-dom";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePetId, setDeletePetId] = useState(null);

  const navigate = useNavigate();

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

  // Open delete modal
  const handleDeleteClick = (id) => {
    setDeletePetId(id); // Set the pet ID to be deleted
    setShowDeleteModal(true); // Show the modal
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    try {
      await deletePet(deletePetId); // Delete the selected pet
      setShowDeleteModal(false); // Close modal after deletion
      loadPets(currentPage); // Refresh the pet list
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false); // Close modal without deleting
    setDeletePetId(null); // Reset pet ID
  };

  // Handle edit click
  const handleEditClick = (pet) => {
    setEditingPet(pet._id);
    setEditData(pet);
  };

  // Handle edit change
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle edit submit
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
      <h2 className="text-2xl font-bold text-center mb-6">All Pets</h2>

      {/* Search and Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-auto"
        />
        <select
          value={filterSpecies}
          onChange={(e) => setFilterSpecies(e.target.value)}
          className="select select-bordered w-full md:w-auto"
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
          className="input input-bordered w-full md:w-auto"
        />
      </div>

      {/* Pet Cards */}
      {filteredPets.length === 0 ? (
        <p className="text-center">No pets match your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <div
              key={pet._id}
              className="card card-bordered shadow-lg hover:shadow-xl transition rounded-lg overflow-hidden"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{pet.name}</h3>
                <p>Species: {pet.species}</p>
                <p>Breed: {pet.breed}</p>
                <p>Age: {pet.age} years</p>
                <p>Price: ${pet.price}</p>
                <p>Diet: {pet.diet}</p>
                <p>Vaccinated: {pet.vaccinated ? "Yes" : "No"}</p>
                <p>Potty Trained: {pet.pottyTrained ? "Yes" : "No"}</p>
                <p>Spayed/Neutered: {pet.spayedOrNeutered ? "Yes" : "No"}</p>
                <p>Status: {pet.adopted ? "Adopted" : "Available"}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditClick(pet)}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(pet._id)} // Open delete modal
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/adopt/${pet._id}`)}
                    className="btn btn-sm btn-success"
                  >
                    Adopt Me
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingPet && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Pet</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <label className="block">
                <span className="font-medium">Name:</span>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="block">
                <span className="font-medium">Age:</span>
                <input
                  type="number"
                  name="age"
                  value={editData.age}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="block">
                <span className="font-medium">Price:</span>
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="block">
                <span className="font-medium">Diet:</span>
                <input
                  type="text"
                  name="diet"
                  value={editData.diet}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="block">
                <span className="font-medium">Breed:</span>
                <input
                  type="text"
                  name="breed"
                  value={editData.breed}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="block">
                <span className="font-medium">Gender:</span>
                <select
                  name="gender"
                  value={editData.gender}
                  onChange={handleEditChange}
                  className="select select-bordered w-full"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="vaccinated"
                    checked={editData.vaccinated}
                    onChange={handleEditChange}
                    className="checkbox"
                  />
                  <span>Vaccinated</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="pottyTrained"
                    checked={editData.pottyTrained}
                    onChange={handleEditChange}
                    className="checkbox"
                  />
                  <span>Potty Trained</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="spayedOrNeutered"
                    checked={editData.spayedOrNeutered}
                    onChange={handleEditChange}
                    className="checkbox"
                  />
                  <span>Spayed/Neutered</span>
                </label>
              </div>
              <label className="block">
                <span className="font-medium">Photo URL:</span>
                <input
                  type="text"
                  name="photo"
                  value={editData.photo}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
              </label>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditingPet(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this pet?</p>
            <div className="flex justify-end gap-4">
              <button onClick={handleCancelDelete} className="btn btn-outline">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="btn btn-error">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-outline"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PetList;
