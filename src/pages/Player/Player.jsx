import React, { useEffect, useState, useMemo } from 'react';
import './Player.css';
import back from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  const extractArchiveId = (rawId) => {
    if (!rawId) return '';
    if (rawId.includes('archive.org/details/')) {
      return rawId.split('archive.org/details/')[1];
    } else if (rawId.includes('/details/')) {
      return rawId.split('/details/')[1];
    } else if (rawId.startsWith('http')) {
      try {
        const url = new URL(rawId);
        const parts = url.pathname.split('/');
        return parts[parts.length - 1];
      } catch {
        return rawId;
      }
    }
    return rawId;
  };

  const archiveId = extractArchiveId(id);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://archive.org/metadata/${archiveId}`);
        const data = await res.json();
        setMovieData(data);
      } catch (err) {
        console.error("Failed to fetch movie data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [archiveId]);

  // Use useMemo to calculate videoUrl after movieData is ready
  const videoUrl = useMemo(() => {
    if (!movieData?.files) return null;
    const videoFile = movieData.files.find(file =>
      file.name.match(/\.(mp4|ogv|webm)$/)
    );
    return videoFile ? `https://archive.org/download/${archiveId}/${videoFile.name}` : null;
  }, [movieData, archiveId]);

  return (
    <div className="player">
      <img src={back} alt="Back" onClick={() => navigate(-1)} className="back-button" />

      <div className="video-wrapper">
        {loading ? (
          <p>Loading...</p>
        ) : videoUrl ? (
          <video controls width="100%" height="500px" autoPlay>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No video file available.</p>
        )}
      </div>

      <div className="player-info">
        <h2>{archiveId.replace(/[_-]/g, ' ')}</h2>
      </div>
    </div>
  );
};

export default Player;
