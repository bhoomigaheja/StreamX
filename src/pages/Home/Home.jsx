import React, { useState, useRef } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play from '../../assets/play_icon.png';
import info from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import trailer from '../../assets/The Protector _ Official Trailer [HD] _ Netflix (1).mp4';

const Home = () => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    setShowTrailer(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  const handleMoreInfoClick = () => {
    setShowInfo(true);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        {showTrailer ? (
          <video
            className="banner-video"
            src={trailer}
            ref={videoRef}
            controls
            autoPlay
            loop
            playsInline
          />
        ) : (
          <img src={hero_banner} alt="" className='banner-img' />
        )}

        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img' />
          <p>
            Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.
          </p>
          <div className="hero-btns">
            <button className='btn' onClick={handlePlayClick}>
              <img src={play} alt="" />Play
            </button>
            <button className='btn dark-btn' onClick={handleMoreInfoClick}>
              <img src={info} alt="" /> More Info
            </button>
          </div>
          <TitleCards title="Trending Now" category="popular" />
        </div>
      </div>

      <div className="more-cards">
        <TitleCards title="Bollywood Blockbusters" category="bollywood" />
        <TitleCards title="South Indian Movies" category="south indian" />
        <TitleCards title="Hindi Dubbed Movies" category="hindi dubbed" />
        <TitleCards title="Hollywood Action" category="action" />
        <TitleCards title="Family Drama" category="family" />
        
        <TitleCards title="Animated Adventures" category="animation" />
        <TitleCards title="Laugh Out Loud" category="comedy" />
        <TitleCards title="Documentaries" category="documentary" />
        
        <TitleCards title="Anime Specials" category="anime" />
        <TitleCards title="Kids and Family" category="kids" />
        <TitleCards title="Music & Concerts" category="music" />
        <TitleCards title="Mystery & Thrills" category="mystery" />
      </div>

      <Footer />

      {showInfo && (
        <div className="info-modal">
          <div className="info-content">
            <button className="close-btn" onClick={handleCloseInfo}>✖</button>
            <h2>The Protector</h2>
            <p>
              Discovering his ties to a secret ancient order, a young man in modern Istanbul must save the city from an immortal enemy.
            </p>
            <p className="release-date">
              🎬 <strong>Coming December 14, 2025</strong> – Only on <strong>StreamX</strong>
            </p>
          </div>
          <div className="modal-backdrop" onClick={handleCloseInfo}></div>
        </div>
      )}
    </div>
  );
};

export default Home;
