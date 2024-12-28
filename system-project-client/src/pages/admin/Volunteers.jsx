import React, { useState, useEffect } from "react";
import axios from "axios";

const Volunteers = () => {
  const [pendingVolunteers, setPendingVolunteers] = useState([]); // Pending volunteers
  const [acceptedVolunteers, setAcceptedVolunteers] = useState([]); // Accepted volunteers
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch Volunteers on Component Mount
  useEffect(() => {
    fetchVolunteers();
  }, []);

  // Fetch Pending and Accepted Volunteers
  const fetchVolunteers = async () => {
    try {
      // Fetch Pending Volunteers
      const pendingResponse = await axios.get(
        "http://localhost:5000/api/volunteers/requests"
      );
      setPendingVolunteers(pendingResponse.data);

      // Fetch Accepted Volunteers
      const acceptedResponse = await axios.get(
        "http://localhost:5000/api/volunteers/accepted"
      );
      setAcceptedVolunteers(acceptedResponse.data);
    } catch (err) {
      console.error("Error fetching volunteers:", err);
      setError("Failed to fetch volunteers!");
    } finally {
      setLoading(false);
    }
  };

  // Approve Volunteer
  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/volunteers/approve/${id}`);
      alert("Volunteer approved successfully!");
      fetchVolunteers(); // Refresh data
    } catch (err) {
      console.error("Error approving volunteer:", err);
      alert("Failed to approve volunteer!");
    }
  };

  // Reject Volunteer
  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/volunteers/reject/${id}`);
      alert("Volunteer rejected successfully!");
      fetchVolunteers(); // Refresh data
    } catch (err) {
      console.error("Error rejecting volunteer:", err);
      alert("Failed to reject volunteer!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Volunteers Management</h2>

      {/* Show loading spinner */}
      {loading && <p>Loading volunteers...</p>}

      {/* Show error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Pending Volunteers Table */}
      {!loading && !error && (
        <>
          <h3 className="text-xl font-semibold mb-2 mt-4">
            Pending Volunteers
          </h3>
          {pendingVolunteers.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Photo</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingVolunteers.map((volunteer) => (
                  <tr key={volunteer._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {volunteer.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {volunteer.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={volunteer.photo}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleApprove(volunteer._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(volunteer._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No pending volunteers found.</p>
          )}

          {/* Accepted Volunteers Table */}
          <h3 className="text-xl font-semibold mb-2 mt-8">
            Accepted Volunteers
          </h3>
          {acceptedVolunteers.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Photo</th>
                </tr>
              </thead>
              <tbody>
                {acceptedVolunteers.map((volunteer) => (
                  <tr key={volunteer._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {volunteer.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {volunteer.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={volunteer.photo}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No accepted volunteers found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Volunteers;
