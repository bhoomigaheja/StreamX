import React, { useState, useRef, Suspense } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play from '../../assets/play_icon.png';
import info from '../../assets/info_icon.png';
import Footer from '../../components/Footer/Footer';
import trailer from '../../assets/The Protector _ Official Trailer [HD] _ Netflix (1).mp4';
import { useInView } from 'react-intersection-observer';

// Lazy load TitleCards
const TitleCards = React.lazy(() => import('../../components/TitleCards/TitleCards'));

const LazyTitleCards = ({ title, category }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '100px',
  });

  return (
    <div ref={ref}>
      {inView && (
        <Suspense fallback={<div style={{ height: '200px' }}>Loading...</div>}>
          <TitleCards title={title} category={category} />
        </Suspense>
      )}
    </div>
  );
};

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

  const handleMoreInfoClick = () => setShowInfo(true);
  const handleCloseInfo = () => setShowInfo(false);

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
            preload="none"
            loop
            playsInline
          />
        ) : (
          <img
            src={hero_banner}
            alt="Hero Banner"
            className='banner-img'
            width="1280"
            height="720"
            loading="eager"
          />
        )}

        <div className="hero-caption">
          <img
            src={hero_title}
            alt="Hero Title"
            className='caption-img'
            width="500"
            height="120"
            loading="lazy"
          />
          <p>
            Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.
          </p>
          <div className="hero-btns">
            <button className='btn' onClick={handlePlayClick}>
              <img src={play} alt="Play" width="24" height="24" />Play
            </button>
            <button className='btn dark-btn' onClick={handleMoreInfoClick}>
              <img src={info} alt="Info" width="24" height="24" /> More Info
            </button>
          </div>

          <LazyTitleCards title="Trending Now" category="popular" />
        </div>
      </div>

      <div className="more-cards">
        <LazyTitleCards title="Bollywood Blockbusters" category="bollywood" />
        <LazyTitleCards title="South Indian Movies" category="south indian" />
        <LazyTitleCards title="Hindi Dubbed Movies" category="hindi dubbed" />
        <LazyTitleCards title="Hollywood Action" category="action" />
        <LazyTitleCards title="Family Drama" category="family" />
        <LazyTitleCards title="Animated Adventures" category="animation" />
        <LazyTitleCards title="Laugh Out Loud" category="comedy" />
        <LazyTitleCards title="Documentaries" category="documentary" />
        <LazyTitleCards title="Anime Specials" category="anime" />
        <LazyTitleCards title="Kids and Family" category="kids" />
        <LazyTitleCards title="Music & Concerts" category="music" />
        <LazyTitleCards title="Mystery & Thrills" category="mystery" />
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
