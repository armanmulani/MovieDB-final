import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PopularMoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const apiKey = "c45a857c193f6302f2b5061c3b85e743";
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      setMovies(response.data.results);
    };
    fetchPopularMovies();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Popular Movies</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            style={{ width: "200px", textDecoration: "none", color: "inherit" }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularMoviesPage;
