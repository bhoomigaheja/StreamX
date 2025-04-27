import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./TVShows.css"; // ✅ (ya TitleCards.css reuse)

const TV_CATEGORIES = [
  { title: "Classic TV Shows", category: "classic_tv" },
  { title: "Sci-Fi Shows", category: "science_fiction" },
  { title: "Vintage Cartoons", category: "cartoons" },
  { title: "Comedy Shows", category: "comedy" },
];

const TVShows = () => {
  const [tvData, setTvData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTVShows = async () => {
      setLoading(true);
      const fetchedData = {};

      for (const item of TV_CATEGORIES) {
        try {
          const response = await fetch(
            `https://archive.org/advancedsearch.php?q=subject:(${encodeURIComponent(
              item.category
            )})+AND+mediatype:(movies)&fl[]=identifier,title,description,publicdate&sort[]=downloads+desc&rows=12&page=1&output=json`
          );
          const data = await response.json();
          fetchedData[item.category] = data.response.docs || [];
        } catch (error) {
          console.error(`Error fetching ${item.category} shows:`, error);
          fetchedData[item.category] = [];
        }
      }

      setTvData(fetchedData);
      setLoading(false);
    };

    fetchTVShows();
  }, []);

  return (
    <div className="tv-shows-page">
      <Navbar />
      <div style={{ paddingTop: "80px", paddingBottom: "20px" }}>
        <h1 style={{ marginLeft: "20px" }}>TV Shows</h1>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading TV shows...</p>
        ) : (
          TV_CATEGORIES.map((item) => (
            <div key={item.category} className="titlecards">
              <h2>{item.title}</h2>

              <div className="card-list">
                {tvData[item.category]?.length > 0 ? (
                  tvData[item.category].map((show, index) => (
                    <div
                      key={index}
                      className="card"
                      onClick={() => navigate(`/player/${show.identifier}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={`https://archive.org/services/img/${show.identifier}`}
                        alt={show.title}
                      />
                      <p>{show.title}</p>
                    </div>
                  ))
                ) : (
                  <p>No shows found in {item.title}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TVShows;
