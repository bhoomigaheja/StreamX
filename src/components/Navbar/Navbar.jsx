import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search_icon.svg";
import bell from "../../assets/bell_icon.svg";
import profile from "../../assets/profile_img.png";
import caret from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";
import { Link } from "react-router-dom";
import Search from "../../components/search/search"; // ✅ Import the Search component

const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={navRef} className={`navbar ${isScrolled ? "nav-dark" : ""}`}>
      <div className="navbar-left">
        <img src={logo} alt="Netflix Logo" className="logo" />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tv-shows">TV Shows</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/new-popular">New & Popular</Link></li>
          <li><Link to="/my-list">My List</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
        <Search /> {/* ✅ Correct placement of Search */}
        <img src={bell} alt="Notifications" className="icons" />
        <div className="navbar-profile">
          <img src={profile} alt="Profile" className="profile" />
          <img id="dropdown" src={caret} alt="Caret" />
          <div className="dropdown">
            <p onClick={() => logout()}>Sign Out of StreamX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
