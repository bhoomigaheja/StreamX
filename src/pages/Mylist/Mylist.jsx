import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import './Mylist.css'; 

const MyList = () => {
  const [myList, setMyList] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser || null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchMyList = async () => {
      if (user) {
        try {
          const myListRef = collection(db, 'users', user.uid, 'myList');
          const querySnapshot = await getDocs(myListRef);
          const movies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMyList(movies);
        } catch (error) {
          console.error('Error fetching my list:', error);
        }
      }
    };
    fetchMyList();
  }, [user]);

  // Remove Movie
  const handleRemove = async (movieId) => {
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'myList', movieId));
      setMyList(prev => prev.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error("Failed to remove:", error);
    }
  };

  if (!user) {
    return <p className="message">Please log in to see your list.</p>;
  }

  return (
    <div className="titlecards">
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <h2>My List</h2>
        {myList.length === 0 ? (
          <p className="message">No movies in your list.</p>
        ) : (
          <div className="card-list">
            {myList.map((movie, index) => (
              <div key={index} className="card">
                {/* Remove Button */}
                <div className="remove-icon" onClick={() => handleRemove(movie.id)}>
                  -
                </div>

                <img
                  onClick={() => navigate(`/player/${movie.identifier}`)}
                  src={`https://archive.org/services/img/${movie.identifier}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyList;
