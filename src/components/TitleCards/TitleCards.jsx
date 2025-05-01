import React, { useState, useEffect, useCallback } from 'react';
import './TitleCards.css';
import { useNavigate } from 'react-router-dom';
import AlertMessage from "../AlertMessage/AlertMessage";
import { db, auth } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://archive.org/advancedsearch.php?q=subject:(${encodeURIComponent(
            category
          )})+AND+mediatype:(movies)&fl[]=identifier,title,description,publicdate&sort[]=downloads+desc&rows=12&page=1&output=json`
        );
        const data = await res.json();
        const filtered = data?.response?.docs?.filter((movie) => {
          const title = movie?.title?.toLowerCase() || "";
          const desc = movie?.description?.toLowerCase() || "";
          return !title.includes('trailer') && !desc.includes('trailer');
        }) || [];
        setApiData(filtered);
      } catch (err) {
        console.error('API Error:', err);
        setError("Failed to load movies. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  const handleAddToList = useCallback(async (movie) => {
    if (!user) {
      toast.error('Please log in to add to your list');
      return;
    }
    try {
      const ref = doc(db, 'users', user.uid, 'myList', movie.identifier);
      await setDoc(ref, movie);
      setAlertMessage(`${movie.title} added to your list!`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error('Add to list error:', err);
      toast.error('Failed to add to list');
    }
  }, [user]);

  if (!loading && apiData.length === 0) return null; // ❌ Don't render empty sections

  return (
    <div className="titlecards">
      <h2>{title || `Movies in "${category}"`}</h2>
      {loading && <p>Loading movies...</p>}
      {error && <p className="error">{error}</p>}
      {showAlert && (
        <AlertMessage
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="card-list">
        {apiData.map((movie, index) => (
          <div key={index} className="card">
            <div
              className="add-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToList(movie);
              }}
              title="Add to My List"
            >
              +
            </div>
            <img
              loading="lazy" // ✅ Lazy load images
              onClick={() => navigate(`/player/${movie.identifier}`)}
              src={`https://archive.org/services/img/${movie.identifier}`}
              alt={movie.title}
              width="200"
              height="300"
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
