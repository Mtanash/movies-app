import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import MoviePage from "./Pages/MoviePage";
import MoviesListPage from "./Pages/MoviesListPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesListPage />} />
        <Route path="/movies/:movieId" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
