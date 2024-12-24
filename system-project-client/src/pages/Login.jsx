import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase.config";
import loginImg from "../assets/login_img.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate("/"); // Redirect to Home after login
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/"); // Redirect to Home
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-full lg:w-1/3 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <img
              src="https://img.icons8.com/ios/50/000000/pet-commands-train.png"
              alt="logo"
              className="w-16 h-16 mx-auto"
            />
            <h2 className="text-2xl font-bold mt-4">Welcome Back</h2>
            <p className="text-gray-500">Enter your credentials and login</p>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-customBlue hover:underline"
                onClick={handleForgotPassword}
              >
                Forgot your password?
              </button>
            </div>
            <button
              type="submit"
              className="btn bg-customRed hover:bg-customBlue text-white w-full"
            >
              Log In
            </button>
          </form>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >
            Continue with Google
          </button>
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-customRed hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
      {/* Right Section */}
      <div
        className="w-2/3 hidden lg:flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${loginImg})`,
        }}
      >
        <div className="absolute inset-0 bg-red-500 opacity-50"></div>
        <div className="w-2/3 flex flex-col justify-start text-white p-10 relative">
          <h1 className="text-4xl font-bold mb-4">
            Let's save more lives together
          </h1>
          <p className="mb-6">
            It's good to see you again! Thank you for being a part of adding
            meaning to precious lives around us and giving them another chance.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
