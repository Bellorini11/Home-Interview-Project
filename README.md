# Simplified Flix — Advanced React Router conversion

Original Movies Project preserved separately. This version uses Create React App and React Router v6.

## Run in VS Code
1. Extract ZIP and open the `MoviesProject-React` folder in VS Code.
2. Copy `.env.example` to `.env`, then enter your OMDb API key as `REACT_APP_OMDB_API_KEY=your_key_here`.
3. Run `npm install` in the terminal.
4. Run `npm start` and visit http://localhost:3000.

## Routing checklist
1. `App.jsx`: Parent route `<Route path="/" element={<Layout />}>` with two child routes.
2. `components/Layout.jsx`: Shared navigation/search form and `<Outlet />` for child pages.
3. `components/MovieCard.jsx`: `<Link to="/movie/:id?q=...">` wraps each card.
4. `pages/MovieDetailsPage.jsx`: `useParams()` gets the `id`.
5. `pages/SearchPage.jsx`: `fetch(...&s=searchTerm)` for search cards.
6. `pages/MovieDetailsPage.jsx`: `fetch(...&i=id&plot=full)` for full movie details.

Routes: `/` or `/?q=Batman` for search; `/movie/tt0372784?q=Batman` for details. The query string retains the original search for the back link. Loading, API errors, sorting, and missing posters are handled.

## Important
- The API key is intentionally excluded. Browser-side React environment variables are public; for production, move OMDb requests behind a backend proxy.
- OMDb `s=` results are limited to 10 per page; pagination is not implemented.
- Create React App is deprecated but used here to match your learning workflow.

## Updated styling
The supplied index.css has been merged into src/App.css, including animated navigation, responsive movie grid, movie details layout and skeleton states. The background image was copied into src/assets to preserve its relative CSS URL. React markup uses the matching BEM class names.
