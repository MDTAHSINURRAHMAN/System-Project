import React, { createContext, useContext, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // State for storing admin data

  // Login Function
  const login = (adminData) => {
    setAdmin(adminData); // Set admin data directly in state
  };

  // Logout Function
  const logout = () => {
    setAdmin(null); // Clear admin state
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Access Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
