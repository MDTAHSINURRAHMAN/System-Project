import React from "react";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed!</h1>
        <p className="mb-4">Unfortunately, your payment could not be processed.</p>
        <button
          onClick={() => navigate("/pets")}
          className="btn btn-primary"
        >
          Go to All Pets
        </button>
      </div>
    </div>
  );
};

export default Failure;