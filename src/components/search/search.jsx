import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Debounce the search query to avoid frequent API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timeoutId); // Clear the timeout on query change
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true); // Set loading to true when fetching data

    try {
      const apiUrl = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}+AND+mediatype:(movies)&fl[]=identifier,title,description,publicdate&sort[]=downloads+desc&rows=10&page=1&output=json`;

      console.log('Making request to:', apiUrl); // Log the request URL
      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log('Search Results:', data); // Log the response

      if (data?.response?.docs && data.response.docs.length > 0) {
        setResults(data.response.docs); // Set results from the API response
      } else {
        setResults([]); // No results found
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]); // Set empty results in case of error
    } finally {
      setLoading(false); // Set loading to false once the request is finished
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]); // Close the search results when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-container" ref={searchRef}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          placeholder="Search Movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query state as user types
        />
        <button type="submit">🔍</button>
      </form>

      {/* Display Loading Indicator */}
      {loading && <div className="loading">Loading...</div>}

      {/* Display Search Results */}
      {results.length > 0 && (
        <div className="search-results">
          {results.map((item, index) => (
            <div
              key={index}
              className="search-item"
              onClick={() => {
                navigate(`/player/${item.identifier}`); // Navigate to the player page
                setResults([]); // Hide results after clicking an item
              }}
            >
              <img
                src={`https://archive.org/services/img/${item.identifier}`}
                alt={item.title}
              />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {results.length === 0 && query.trim() && !loading && (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default Search;
