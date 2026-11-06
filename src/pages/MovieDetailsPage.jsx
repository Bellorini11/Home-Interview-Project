import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY || "";
const details = (label, value) =>
  value && value !== "N/A" ? (
    <section className="movie-details__detail" key={label}>
      <h3>{label}</h3>
      <p>{value}</p>
    </section>
  ) : null;

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const backToResults = `/?q=${encodeURIComponent(params.get("q") || "Marvel")}`;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadDetails() {
      setLoading(true);
      setError("");
      setMovie(null);
      const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));
      if (!API_KEY) {
        setError();
        setLoading(false);
        return;
      }
      try {
        const url = `https://www.omdbapi.com/?apikey=${encodeURIComponent(API_KEY)}&i=${encodeURIComponent(id)}&plot=full`;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to reach movie service.");
        const data = await response.json();
        if (data.Response !== "True")
          throw new Error(data.Error || "Movie details not found.");
        if (!controller.signal.aborted) setMovie(data);
      } catch (err) {
        if (err.name !== "AbortError" && !controller.signal.aborted)
          setError(err.message || "Error fetching movie details.");
      } finally {
        await minDelay;
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadDetails();
    return () => controller.abort();
  }, [id]);

  return (
    <main className="main">
      <div className="movie-details__container">
        <div className="movie-details__back">
          <Link className="movie-details__back-link" to={backToResults}>
            ← Back to search results
          </Link>
        </div>
        {!loading && error && (
          <p role="alert" className="status-message">
            {error}
          </p>
        )}
        {loading && (
          <div
            className="movie-details__content"
            role="status"
            aria-label="Loading movie details"
          >
            <div className="movie-details__poster--skeleton" />
            <div className="movie-details__info--skeleton">
              <div className="movie-details__title--skeleton" />
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="movie-details__info-line--skeleton" />
              ))}
            </div>
          </div>
        )}
        {!loading && movie && (
          <article className="movie-details__content">
            <div className="movie-details__poster--wrapper">
              {movie.Poster && movie.Poster !== "N/A" ? (
                <img
                  className="movie-details__poster"
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                />
              ) : (
                <div className="movie-details__poster-placeholder">
                  Movie Poster Not Available
                </div>
              )}
            </div>
            <div className="movie-details__info">
              <h1 className="movie-details__title">{movie.Title}</h1>
              <p className="movie-details__year">
                {movie.Year} · {movie.Rated} · {movie.Runtime}
              </p>
              <p className="movie-details__rating">
                IMDb rating: {movie.imdbRating}/10
              </p>
              <p className="movie-details__released">
                Released: {movie.Released}
              </p>
              <div className="movie-details__text--wrapper">
                {details("Plot", movie.Plot)}
                {details("Genre", movie.Genre)}
                {details("Director", movie.Director)}
                {details("Cast", movie.Actors)}
                {details("Writer", movie.Writer)}
                {details("Awards", movie.Awards)}
              </div>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
