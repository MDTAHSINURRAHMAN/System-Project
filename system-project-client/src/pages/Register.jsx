import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import axios from "axios";
import registerImg from "../assets/register_img.jpg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser(email, password, name, photo);
      console.log("Registered User:", user); // Confirm user details
      alert("User registered successfully!");
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Image */}
      <div
        className="w-2/3 hidden lg:flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${registerImg})`,
        }}
      >
        <div className="absolute inset-0 bg-red-500 opacity-50"></div>
        <div className="text-white p-10 relative">
          <h1 className="text-4xl font-bold mb-4">
            Join us to save more lives!
          </h1>
          <p className="mb-6">
            Be a part of our mission to give animals a second chance at life.
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/3 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mt-4">Create an Account</h2>
            <p className="text-gray-500">Join us and start your journey!</p>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && (
            <p className="text-green-500 text-sm text-center">{message}</p>
          )}
          <form onSubmit={handleRegister} className="space-y-4">
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
            <button
              type="submit"
              className="btn bg-customRed text-white w-full"
            >
              Register
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
