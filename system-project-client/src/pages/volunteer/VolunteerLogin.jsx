import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/authContext"; // Use Context API

const VolunteerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginVolunteer } = useAuth(); // Use Context API for state management
  const navigate = useNavigate();

  const handleVolunteerLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/volunteers/login",
        { email, password }
      );
  
      console.log("Login Response:", response.data); // Debugging log
  
      // Check if accepted by admin
      const volunteerData = response.data.volunteer; // Extract volunteer
    //   if (!volunteerData.acceptedByAdmin) {
    //     alert("Registration successful! Waiting for admin approval.");
    //     return;
    //   }
  
      // Save volunteer data to context
      loginVolunteer(volunteerData); // Use context to set volunteer data
      alert("Volunteer logged in successfully!");
      navigate("/volunteer"); // Redirect to dashboard
    } catch (error) {
      console.error("Volunteer Login Error:", error);
      setError(error.response?.data?.message || "Login failed.");
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Volunteer Login</h2>
          <p className="text-gray-500">Access your dashboard</p>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleVolunteerLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn bg-customRed text-white w-full">
            Login as Volunteer
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a
            href="/volunteer-register"
            className="text-blue-500 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default VolunteerLogin;
