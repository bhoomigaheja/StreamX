import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_KEY = "e325e198af0ed4ad8ab9f67265504489"; // ✅ Your TMDb API Key
const BASE_URL = "https://api.themoviedb.org/3";

const CATEGORIES = [


 
  { id: "popular_tv", endpoint: "tv/popular", title: "Popular TV Shows" },
  { id: "top_rated_tv", endpoint: "tv/top_rated", title: "Top Rated TV Shows" },
  { id: "top_rated_movies", endpoint: "movie/top_rated", title: "Top Rated Movies" },
];

const NewPopular = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = {};

      for (const category of CATEGORIES) {
        try {
          const response = await fetch(
            `${BASE_URL}/${category.endpoint}?api_key=${API_KEY}&language=en-US&page=1`
          );
          const result = await response.json();
          fetchedData[category.id] = result.results || [];
        } catch (error) {
          console.error(`Error fetching ${category.id}:`, error);
          fetchedData[category.id] = [];
        }
      }
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <div className="new-popular-page">
      <Navbar />
      <div style={{ paddingTop: "80px", paddingBottom: "20px" }}>
      <h1>New & Popular</h1>

      {CATEGORIES.map((category) => (
        <div key={category.id} className="category-section" style={{ marginBottom: "60px" }}>
          <h2>{category.title}</h2>
          <div className="card-list">
            {data[category.id]?.length > 0 ? (
              data[category.id].map((item) => (
                <div
                  key={item.id}
                  className="card"
                  onClick={() => navigate(`/player/${item.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                    alt={item.title || item.name}
                  />
                  <p>{item.title || item.name}</p>
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

export default NewPopular;
