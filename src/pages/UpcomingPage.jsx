import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UpcomingPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const apiKey = "c45a857c193f6302f2b5061c3b85e743";
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`
      );
      setMovies(response.data.results);
    };
    fetchUpcomingMovies();
  }, [page]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upcoming Movies</h1>
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
              style={{ width: "100%" }}
            />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UpcomingPage;
