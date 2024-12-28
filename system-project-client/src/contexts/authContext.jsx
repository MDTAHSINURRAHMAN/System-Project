import React, { createContext, useContext, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // State for storing admin data
  const [volunteer, setVolunteer] = useState(null); // State for storing volunteer data

  // Admin Login Function
  const loginAdmin = (adminData) => {
    setAdmin(adminData); // Set admin data directly in state
  };

  // Volunteer Login Function
  const loginVolunteer = (volunteerData) => {
    setVolunteer(volunteerData); // Set volunteer data directly in state
  };

  // Admin Logout Function
  const logoutAdmin = () => {
    setAdmin(null); // Clear admin state
  };

  // Volunteer Logout Function
  const logoutVolunteer = () => {
    setVolunteer(null); // Clear volunteer state
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        volunteer,
        loginAdmin,
        loginVolunteer,
        logoutAdmin,
        logoutVolunteer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Access Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
