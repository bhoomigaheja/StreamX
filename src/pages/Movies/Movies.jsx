import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_KEY = "e325e198af0ed4ad8ab9f67265504489"; // ✅ Your TMDb API Key
const BASE_URL = "https://api.themoviedb.org/3/movie";

const CATEGORIES = [
  { id: "popular", title: "Popular Movies" },
  { id: "top_rated", title: "Top Rated Movies" },
  { id: "now_playing", title: "Now Playing" },
  { id: "upcoming", title: "Upcoming Movies" },
];

const Movies = () => {
  const [movies, setMovies] = useState({});
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
          console.error(`Error fetching ${category.id} movies:`, error);
          fetchedData[category.id] = [];
        }
      }
      setMovies(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <div className="movies-page">
      <Navbar />
      <div style={{ paddingTop: "80px", paddingBottom: "20px" }}>
      <h1>Movies</h1>

      {CATEGORIES.map((category) => (
        <div key={category.id} className="category-section" style={{ marginBottom: "60px" }}>
          <h2>{category.title}</h2>
          <div className="card-list">
            {movies[category.id]?.length > 0 ? (
              movies[category.id].map((movie) => (
                <div
                  key={movie.id}
                  className="card"
                  onClick={() => navigate(`/player/${movie.id}`)} // ✅ Added Player Navigation
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                  <p>{movie.title}</p>
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

export default Movies;
