import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "e325e198af0ed4ad8ab9f67265504489";
const SEARCH_URL = "https://api.themoviedb.org/3/search/multi";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await fetch(`${SEARCH_URL}?api_key=${API_KEY}&query=${query}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container" ref={searchRef}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Movies, TV Shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      {/* Display Search Results */}
      {results.length > 0 && (
        <div className="search-results">
          {results.map((item) => (
            <div
              key={item.id}
              className="search-item"
              onClick={() => {
                navigate(`/player/${item.id}`);
                setResults([]); // ✅ Hide results after clicking
              }}
            >
              {item.backdrop_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                  alt={item.title || item.name}
                />
              )}
              <p>{item.title || item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
