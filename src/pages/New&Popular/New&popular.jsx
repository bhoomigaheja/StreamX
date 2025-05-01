import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";



const CATEGORIES = [
  { id: "classic_movies", title: "Classic Movies", category: "classic" },
  { id: "action_movies", title: "Action Packed Movies", category: "action" },
  { id: "popular_tv", title: "Popular TV Shows", category: "music" },
  { id: "Mystery_movies", title: "South Indian Movies", category: "mystery" },
  { id: "hollywood_action", title: "Hollywood Action", category: "action" },
  { id: "comedy_movies", title: "Comedy Movies", category: "comedy" },
  { id: "Anime", title: "Documentaries", category: "anime" },
  
 
];

const NewPopular = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = {};

      for (const cat of CATEGORIES) {
        try {
          const response = await fetch(
            `https://archive.org/advancedsearch.php?q=subject:(${encodeURIComponent(
              cat.category
            )})+AND+mediatype:(movies)&fl[]=identifier,title,description,publicdate&sort[]=downloads+desc&rows=12&page=1&output=json`
          );
          const result = await response.json();
          fetchedData[cat.id] = result.response.docs || [];
        } catch (error) {
          console.error(`Error fetching ${cat.id}:`, error);
          fetchedData[cat.id] = [];
        }
      }

      setData(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="new-popular-page">
      <Navbar />
      <div style={{ paddingTop: "80px", paddingBottom: "20px" }}>
        <h1 style={{ marginLeft: "20px" }}>New & Popular</h1>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          CATEGORIES.map((cat) => (
            <div key={cat.id} className="titlecards">
              <h2>{cat.title}</h2>
              <div className="card-list">
                {data[cat.id]?.length > 0 ? (
                  data[cat.id].map((item, index) => (
                    <div
                      key={index}
                      className="card"
                      onClick={() => navigate(`/player/${item.identifier}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={`https://archive.org/services/img/${item.identifier}`}
                        alt={item.title}
                      />
                      <p>{item.title}</p>
                    </div>
                  ))
                ) : (
                  <p>No items found for {cat.title}</p>
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

export default NewPopular;
