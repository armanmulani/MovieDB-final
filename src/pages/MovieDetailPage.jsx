import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./MovieDetailPage.css"; // Import CSS for styling

function MovieDetailPage() {
  const { id } = useParams(); // Get the movie id from the URL
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const apiKey = "c45a857c193f6302f2b5061c3b85e743";
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        setMovie(movieResponse.data);

        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
        );
        setCast(castResponse.data.cast);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movie details. Please try again.");
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-detail-container">
      <div className="movie-header">
        <img
          className="movie-poster"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.title}
        />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="movie-overview">{movie.overview}</p>
          <p className="movie-release-date">
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="movie-rating">
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>

      <h2>Cast</h2>
      <div className="movie-cast">
        {cast.slice(0, 6).map((actor) => (
          <div key={actor.id} className="cast-card">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : "https://via.placeholder.com/150"
              }
              alt={actor.name}
              className="cast-image"
            />
            <h3 className="cast-name">{actor.name}</h3>
            <p className="cast-character">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetailPage;
