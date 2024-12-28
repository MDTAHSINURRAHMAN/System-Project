import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VolunteerRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVolunteerRegister = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to backend
      const response = await axios.post("http://localhost:5000/api/volunteers/register", {
        name,
        email,
        password,
        photo,
      });

      // Check if acceptedByAdmin is false
      if (!response.data.acceptedByAdmin) {
        setMessage(
          "Registration successful! Please wait for admin approval to login."
        );
      } else {
        setMessage("Volunteer registered successfully!");
        alert("Volunteer registered successfully!");
        navigate("/volunteer-login");
      }
    } catch (error) {
      console.error("Volunteer Registration Error:", error);
      setError(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Volunteer Registration</h2>
          <p className="text-gray-500">Join us and make a difference!</p>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && (
          <p className="text-green-500 text-sm text-center">{message}</p>
        )}
        <form onSubmit={handleVolunteerRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input input-bordered w-full"
          />
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
          <input
            type="text"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn bg-customRed text-white w-full">
            Register as Volunteer
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/volunteer-login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default VolunteerRegister;
