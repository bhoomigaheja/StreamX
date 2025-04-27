import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Movies.css"; // Your custom CSS for styling

const MOVIE_CATEGORIES = [
  { title: "Bollywood Blockbusters", category: "bollywood" },
  { title: "South Indian Movies", category: "south indian" },
  { title: "Hollywood Action", category: "action" },
  { title: "Drama & Romance", category: "romance" },
  { title: "Classic Movies", category: "classic" },
  { title: "Comedy Movies", category: "comedy" },
  // Add more categories as needed
];

const Movies = () => {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const fetchedData = {};

      for (const item of MOVIE_CATEGORIES) {
        try {
          const response = await fetch(
            `https://archive.org/advancedsearch.php?q=subject:(${encodeURIComponent(
              item.category
            )})+AND+mediatype:(movies)&fl[]=identifier,title,description,publicdate&sort[]=downloads+desc&rows=12&page=1&output=json`
          );
          const data = await response.json();
          fetchedData[item.category] = data.response.docs || [];
        } catch (error) {
          console.error(`Error fetching ${item.category} movies:`, error);
          fetchedData[item.category] = [];
        }
      }

      setMovieData(fetchedData);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies-page">
      <Navbar />
      <div style={{ paddingTop: "80px", paddingBottom: "20px" }}>
        <h1>Movies</h1>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading Movies...</p>
        ) : (
          MOVIE_CATEGORIES.map((item) => (
            <div key={item.category} className="titlecards">
              <h2>{item.title}</h2>
              <div className="card-list">
                {movieData[item.category]?.length > 0 ? (
                  movieData[item.category].map((movie, index) => (
                    <div
                      key={index}
                      className="card"
                      onClick={() => navigate(`/player/${movie.identifier}`)} // Movie player navigation
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={`https://archive.org/services/img/${movie.identifier}`}
                        alt={movie.title}
                      />
                      <p>{movie.title}</p>
                    </div>
                  ))
                ) : (
                  <p>No movies found in this category.</p>
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

export default Movies;
