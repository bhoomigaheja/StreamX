import React, { useState, useEffect } from 'react';
import './TitleCards.css';
import { useNavigate } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://archive.org/advancedsearch.php?q=subject:(${encodeURIComponent(
            category
          )})+AND+mediatype:(movies)&fl[]=identifier,title,description,publicdate&sort[]=downloads+desc&rows=12&page=1&output=json`
        );

        const data = await response.json();
        if (data?.response?.docs) {
          setApiData(data.response.docs);
        } else {
          setApiData([]);
        }
      } catch (err) {
        console.error('Internet Archive API error:', err);
        setError('Failed to load movies. Try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  return (
    <div className="titlecards">
      <h2>{title || `Movies in "${category}"`}</h2>
      {loading && <p>Loading movies...</p>}
      {error && <p className="error">{error}</p>}

      <div className="card-list">
        {apiData.length > 0 ? (
          apiData.map((movie, index) => (
            <div
              key={index}
              className="card"
              onClick={() => navigate(`/player/${movie.identifier}`)}
              style={{ cursor: 'pointer' }}
            >
              {/* Fallback thumbnail using archive.org preview thumbnail pattern */}
              <img
                src={`https://archive.org/services/img/${movie.identifier}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))
        ) : (
          !loading && <p>No movies found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
