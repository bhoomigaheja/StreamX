// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW2C_ll7fh7DT1qdJbm9D9URv15gPfhcY",
  authDomain: "netflix-clone-149c1.firebaseapp.com",
  projectId: "netflix-clone-149c1",
  storageBucket: "netflix-clone-149c1.firebasestorage.app",
  messagingSenderId: "553544845385",
  appId: "1:553544845385:web:392924689872e2d78fd798"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Utility function to validate email format
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);  // Regex to check email format

// Login function
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // ✅ Return user object if successful
  } catch (error) {
    console.error("Login Error:", error);
    toast.error(error.message || "Login failed. Please try again.");
    return null; // ✅ Return null on error
  }
};

// Signup function
const signup = async (name, email, password) => {
  if (!isValidEmail(email)) {
    toast.error("Invalid email format.");
    return null;
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Create user in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    return user; // ✅ Return user if successful
  } catch (error) {
    console.error("Signup Error:", error);
    toast.error(error.message || "Signup failed. Please try again.");
    return null; // ✅ Return null on error
  }
};

// Logout function
const logout = () => {
  signOut(auth);
};

// Export functions
export { auth, db, signup, login, logout };
