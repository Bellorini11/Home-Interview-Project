import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
export default function MovieCard({ movie }) {
  const [broken, setBroken] = useState(false);
  const [params] = useSearchParams();
  const query = params.get("q") || "Marvel";
  const hasPoster = movie.Poster && movie.Poster !== "N/A" && !broken;
  return (
    <Link className="movie-card" to={`/movie/${encodeURIComponent(movie.imdbID)}?q=${encodeURIComponent(query)}`} aria-label={`View details for ${movie.Title}`}>
      {hasPoster ? <img className="movie-card__img" src={movie.Poster} alt={`${movie.Title} poster`} onError={() => setBroken(true)} /> : <div className="movie-card__poster-placeholder">Movie Poster<br/>Not Available</div>}
      <h2 className="movie-card__title">{movie.Title}</h2>
      <p className="movie-card__year">{movie.Year}</p>
    </Link>
  );
}
