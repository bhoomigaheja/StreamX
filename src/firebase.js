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


const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // ✅ Return user object if successful
    } catch (error) {
        console.error("Login Error:", error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

        return null; // ✅ Return null on error
    }
};

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });

        return user; // ✅ Return user if successful
    } catch (error) {
        console.error("Signup Error:", error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
;
        return null; // ✅ Return null on error
    }
};

const logout = ()=>{
    signOut(auth);
}

export {auth,db,signup,login,logout};
