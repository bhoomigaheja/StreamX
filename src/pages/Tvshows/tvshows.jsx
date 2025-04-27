import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_KEY = "e325e198af0ed4ad8ab9f67265504489"; // ✅ Your TMDb API Key
const BASE_URL = "https://api.themoviedb.org/3/tv";

const CATEGORIES = [
  { id: "popular", title: "Popular TV Shows" },
  { id: "top_rated", title: "Top Rated TV Shows" },
  { id: "airing_today", title: "Airing Today" },
  { id: "on_the_air", title: "Currently Airing" },
];

const TVShows = () => {
  const [tvShows, setTVShows] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = {};
      for (const category of CATEGORIES) {
        try {
          const response = await fetch(
            `${BASE_URL}/${category.id}?api_key=${API_KEY}&language=en-US&page=1`
          );
          const data = await response.json();
          fetchedData[category.id] = data.results || [];
        } catch (error) {
          console.error(`Error fetching ${category.id} shows:`, error);
          fetchedData[category.id] = [];
        }
      }
      setTVShows(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <div className="tv-shows-page">
      <Navbar />
      <div style={{ paddingTop: "80px", paddingBottom: "20px" }}>
      <h1>TV Shows</h1>

      {CATEGORIES.map((category) => (
        <div key={category.id} className="category-section" style={{ marginBottom: "60px" }}>
          <h2>{category.title}</h2>
          <div className="card-list">
            {tvShows[category.id]?.length > 0 ? (
              tvShows[category.id].map((show) => (
                <div
                  key={show.id}
                  className="card"
                  onClick={() => navigate(`/player/${show.id}`)} // ✅ Added Player Navigation
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                    alt={show.name}
                  />
                  <p>{show.name}</p>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      ))}
      </div>
      <Footer />
    </div>
  );
};

export default TVShows;
