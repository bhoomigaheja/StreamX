import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play from '../../assets/play_icon.png';
import info from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img' />
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img' />
          <p>
            Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.
          </p>
          <div className="hero-btns">
            <button className='btn'> <img src={play} alt="" />Play</button>
            <button className='btn dark-btn'> <img src={info} alt="" /> More Info</button>
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
        <TitleCards title="Old Classic Hits" category="classic" />
        <TitleCards title="Thrilling Suspense" category="thriller" />
       
        <TitleCards title="Animated Adventures" category="animation" />
        <TitleCards title="Laugh Out Loud" category="comedy" />
     
        <TitleCards title="Documentaries" category="documentary" />
        <TitleCards title="War and History" category="war" />
        <TitleCards title="Anime Specials" category="anime" />
        <TitleCards title="Kids and Family" category="kids" />
        <TitleCards title="Music & Concerts" category="music" />
     
        <TitleCards title="Mystery & Thrills" category="mystery" />
       
  


      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
