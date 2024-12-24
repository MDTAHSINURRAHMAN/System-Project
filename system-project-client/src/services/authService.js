import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase.config"

// Register User
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
