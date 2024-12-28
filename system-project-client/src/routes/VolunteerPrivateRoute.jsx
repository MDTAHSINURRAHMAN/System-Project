import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const VolunteerPrivateRoute = ({ children }) => {
  const { volunteer } = useAuth(); // Check volunteer state

  console.log("Volunteer State:", volunteer); // Debugging log

  // Redirect if not logged in
  if (!volunteer) {
    return <Navigate to="/volunteer-login" />;
  }

  return children; // Allow access if logged in
};

export default VolunteerPrivateRoute;
    