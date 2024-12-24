import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.config";
import axios from "axios"; // Added axios for MongoDB storage

// Register User
export const registerUser = async (email, password, name, photo) => {
  try {
    console.log("Starting Firebase Registration...");

    // Step 1: Create User in Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Firebase user created:", userCredential.user);

    // Step 2: Update Profile
    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: photo,
    });
    console.log("Firebase profile updated:", auth.currentUser);

    // Step 3: Reload Profile and Check UID
    await userCredential.user.reload();
    const uid = auth.currentUser?.uid; // Get UID after reload
    console.log("Firebase UID:", uid);

    if (!uid) {
      throw new Error("Invalid Firebase UID!");
    }

    // Step 4: Save User to MongoDB
    const response = await axios.post(
      "http://localhost:5000/api/users/register",
      {
        uid, // Send Firebase UID
        name,
        email,
        password, // Plain password, hashed in backend
        photo,
      }
    );
    console.log("MongoDB Response:", response.data);

    return userCredential.user;
  } catch (error) {
    console.error("Registration Error:", error.message);
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
    console.error("Error logging in:", error.code, error.message); // Added detailed logs
    throw error;
  }
};

// Google Login
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);

    // Save Google user to MongoDB if not already present
    await axios.post("http://localhost:5000/api/users/register", {
      name: userCredential.user.displayName,
      email: userCredential.user.email,
      password: "google-auth", // Placeholder password
      photo: userCredential.user.photoURL,
    });

    return userCredential.user;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
};

// Forgot Password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
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
