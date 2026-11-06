import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY || "";
export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q")?.trim() || "Marvel";
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadMovies() {
      setLoading(true);
      setError("");
      setMovies([]);
      setSort("default");
      const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));
      if (!API_KEY) {
        setError();
        setLoading(false);
        return;
      }
      try {
        const url = `https://www.omdbapi.com/?apikey=${encodeURIComponent(API_KEY)}&s=${encodeURIComponent(query)}`;
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json().catch(() => ({}));
        if (!response.ok)
          throw new Error(data.Error || "Unable to reach movie service.");
        if (data.Response !== "True")
          throw new Error(data.Error || "No movies found.");
        if (!controller.signal.aborted) setMovies(data.Search || []);
      } catch (err) {
        if (err.name !== "AbortError")
          setError(err.message || "Error fetching movies.");
      } finally {
        await minDelay;
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadMovies();
    return () => controller.abort();
  }, [query]);

  const sortedMovies = useMemo(() => {
    const items = [...movies];
    if (sort === "a-z") items.sort((a, b) => a.Title.localeCompare(b.Title));
    if (sort === "z-a") items.sort((a, b) => b.Title.localeCompare(a.Title));
    if (sort === "newest")
      items.sort((a, b) => parseInt(b.Year, 10) - parseInt(a.Year, 10));
    if (sort === "oldest")
      items.sort((a, b) => parseInt(a.Year, 10) - parseInt(b.Year, 10));
    return items;
  }, [movies, sort]);

  return (
    <main className="main">
      <div className="controls">
        <p className="resultsInfo">
          <span>Showing: </span>
          {query}
        </p>
        <div>
          <label htmlFor="sortSelect">Sort:</label>
          <select
            id="sortSelect"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div className="movies-grid" aria-live="polite">
        {loading ? (
          Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="movie-card--skeleton"
              role="status"
              aria-label="Loading movies"
            >
              <div className="movie-card__img--skeleton" />
              <div className="movie-card__title--skeleton" />
              <div className="movie-card__year--skeleton" />
            </div>
          ))
        ) : error ? (
          <p className="status-message">{error}</p>
        ) : (
          sortedMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        )}
      </div>
    </main>
  );
}
