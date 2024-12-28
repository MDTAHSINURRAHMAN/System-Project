import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/authContext"; // Use auth context to fetch volunteer data

const VolunteerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { volunteer } = useAuth(); // Get logged-in volunteer data

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/volunteers/profile/${volunteer._id}`
        );
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile!");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [volunteer._id]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="space-y-3">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <img
          src={profile.photo}
          alt="Profile"
          className="w-20 h-20 rounded-full mt-4"
        />
      </div>
    </div>
  );
};

export default VolunteerProfile;
