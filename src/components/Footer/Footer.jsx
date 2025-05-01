import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import youtube from '../../assets/youtube_icon.png';
import twitter from '../../assets/twitter_icon.png';
import facebook from '../../assets/facebook_icon.png';
import instagram from '../../assets/instagram_icon.png';

const Footer = () => {
  return (
    <footer className='footer' role="contentinfo">
      <div className="footer-icons" aria-label="Social media links">
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <img src={youtube} alt="YouTube" width="24" height="24" loading="lazy" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <img src={twitter} alt="Twitter" width="24" height="24" loading="lazy" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <img src={facebook} alt="Facebook" width="24" height="24" loading="lazy" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <img src={instagram} alt="Instagram" width="24" height="24" loading="lazy" />
        </a>
      </div>

      <ul className="footer-links" aria-label="Site navigation links">
        <li><Link to="/terms-of-use">Terms of Use</Link></li>
        <li><Link to="/privacy">Privacy</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/tv-shows">TV Shows</Link></li>
        <li><Link to="/new-popular">New & Popular</Link></li>
        <li><Link to="/my-list">My List</Link></li>
      </ul>

      <p className='copywrite-text'>&copy; 2025 StreamX. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
