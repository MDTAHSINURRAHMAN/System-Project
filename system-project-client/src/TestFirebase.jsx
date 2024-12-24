import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.config";

const TestFirebase = () => {
  const handleTest = async () => {
    try {
      // Try to create a test user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        "testuser@email.com", // Test email
        "password123" // Test password
      );
      console.log("Firebase User Created:", userCredential.user);
      alert("User created successfully!");
    } catch (error) {
      console.error("Firebase Error:", error.message);
      alert("Firebase Error: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Test Firebase</h1>
      <button onClick={handleTest} style={{ padding: "10px 20px" }}>
        Create Test User
      </button>
    </div>
  );
};

export default TestFirebase;
