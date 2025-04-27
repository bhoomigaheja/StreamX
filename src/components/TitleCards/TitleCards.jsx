import React, { useState, useEffect } from 'react';
import './TitleCards.css';
import { useNavigate } from 'react-router-dom';
import AlertMessage from "../AlertMessage/AlertMessage";
import { db, auth } from '../../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
          const filteredData = data.response.docs.filter((movie) => {
            const titleLower = movie.title.toLowerCase();
            const descriptionLower = movie.description ? movie.description.toLowerCase() : '';
            return !titleLower.includes('trailer') && !descriptionLower.includes('trailer');
          });

          setApiData(filteredData);
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is logged in
      } else {
        setUser(null); // User is logged out
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  const handleAddToList = async (movie) => {
    if (!user) {
      toast.error('Please log in to add to your list');
      return;
    }
  
    try {
      const listRef = doc(db, 'users', user.uid, 'myList', movie.identifier);
      await setDoc(listRef, movie);
  
      setAlertMessage(`${movie.title} has been added to your list!`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Error adding to list:', error);
      toast.error('Failed to add to list');
    }
  };
  
  

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
        {apiData.length > 0 ? (
          apiData.map((movie, index) => (
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
                onClick={() => navigate(`/player/${movie.identifier}`)}
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
