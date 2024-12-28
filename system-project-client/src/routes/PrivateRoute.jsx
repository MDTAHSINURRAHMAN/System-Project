import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = ({ children }) => {
  const { admin } = useAuth();

  // If not logged in, redirect to admin login page
  if (!admin) {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

export default PrivateRoute;
