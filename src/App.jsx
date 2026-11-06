import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SearchPage from "./pages/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path="movie/:id" element={<MovieDetailsPage />} />
          <Route
            path="*"
            element={
              <main>
                <p className="status-message">Page not found.</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
