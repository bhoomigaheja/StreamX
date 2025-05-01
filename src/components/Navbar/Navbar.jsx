import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search_icon.svg";
import bell from "../../assets/bell_icon.svg";
import profile from "../../assets/profile_img.png";
import caret from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";
import { Link } from "react-router-dom";
import Search from "../../components/search/search";

const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

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
        <Search />
        <div className="notification-container">
          <img
            src={bell}
            alt="Notifications"
            className="icons"
            onClick={toggleNotifications}
          />
          {showNotifications && (
            <div className="notification-dropdown">
              <p>🎬 <strong>The Protector</strong> is coming December 14!</p>
              <p>🔥 Trending: Check out new Bollywood blockbusters!</p>
              <p>⭐ Your watchlist was updated recently.</p>
            </div>
          )}
        </div>
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
