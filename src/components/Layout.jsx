import { Link, Outlet, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Layout() {
  const navigate = useNavigate();
  const handleSearch = (term) => navigate(`/?q=${encodeURIComponent(term)}`);
  return (
    <>
      <nav className="nav">
        <Link className="logo" to="/" aria-label="Simplified Flix home">
          <img src="/assets/fes-logo.png" alt="" className="logo__img" />
          <div className="logo__title"><span>Simplified</span> Flix</div>
        </Link>
        <SearchBar onSearch={handleSearch} />
      </nav>
      <Outlet />
      <footer><p>Created by Simplified. Powered by OMDBapi.</p></footer>
    </>
  );
}
