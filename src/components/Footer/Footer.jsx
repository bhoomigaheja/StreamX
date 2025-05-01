import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Footer.css';
import youtube from '../../assets/youtube_icon.png';
import twitter from '../../assets/twitter_icon.png';
import facebook from '../../assets/facebook_icon.png';
import instagram from '../../assets/instagram_icon.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <img src={youtube} alt="YouTube" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={twitter} alt="Twitter" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={facebook} alt="Facebook" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={instagram} alt="Instagram" />
        </a>
      </div>

      <ul className="footer-links">
        <li><Link to="/terms-of-use">Terms of Use</Link></li>
        <li><Link to="/privacy">Privacy</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        <li><Link to="/login">Login</Link></li>  {/* Added Login link */}
        <li><Link to="/signup">Sign Up</Link></li> {/* Added Sign Up link */}
        <li><Link to="/movies">Movies</Link></li> {/* Added Movies link */}
        <li><Link to="/tv-shows">TV Shows</Link></li> {/* Added TV Shows link */}
        <li><Link to="/new-popular">New & Popular</Link></li> {/* Added New & Popular link */}
        <li><Link to="/my-list">My List</Link></li> {/* Added My List link */}
      </ul>

      <p className='copywrite-text'>
        © 2025 StreamX. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
