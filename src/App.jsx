import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TVShows from "./pages/Tvshows/tvshows";
import Movies from "./pages/Movies/Movies";
import NewPopular from "./pages/New&Popular/New&popular";
import MyList from "./pages/Mylist/Mylist";
import HelpCenter from './pages/helpcentre';
import TermsOfUse from './pages/termsofuse';
import Privacy from './pages/privacypolicy';
import ContactUs from './pages/Contactus';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const currentPath = window.location.pathname;
      if (!user && currentPath !== "/login") {
        navigate("/login");
      } else if (user && (currentPath === "/login" || currentPath === "/")) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tv-shows" element={<TVShows />} />
  <Route path="/movies" element={<Movies />} /> 
  <Route path="/new-popular" element={<NewPopular />} /> 
     {/* ✅ Fix: Add Route for Player */}
     <Route path="/player/:id" element={<Player />} />
     <Route path="/my-list" element={<MyList />} />
     <Route path="/my-list" element={<MyList />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact-us" element={<ContactUs />} />
</Routes>
    </div>
  );
};

export default App;
