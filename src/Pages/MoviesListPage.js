import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { apiKey } from "../constants";
import useAxios from "../hooks/useAxios";
import styles from "./MoviesListPage.module.css";

const MoviesListPage = () => {
  const moviesListRef = useRef();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const {
    data: { page: pageIndex, results: movies, total_pages, total_results },
    error: moviesError,
    loading: moviesLoading,
    fetchData,
  } = useAxios();

  const handlePageIncrease = useCallback(() => {
    if (page === total_pages) return;

    moviesListRef.current.scrollIntoView();
    navigate(`/movies?page=${+page + 1}`);
  }, [page, total_pages, navigate]);

  const handlePageDecrease = useCallback(() => {
    if (page === 1) return;

    moviesListRef.current.scrollIntoView();
    navigate(`/movies?page=${+page - 1}`);
  }, [page, navigate]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    fetchData(
      `/popular?api_key=${apiKey}&language=en-US&page=${page}`,
      controller.signal,
      mounted
    );

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [fetchData, page]);

  let content;

  if (moviesLoading) {
    content = <Loading fullHeight />;
  } else if (moviesError) {
    content = <Error />;
  } else {
    content = movies?.map((movie) => <MovieCard movie={movie} />);
  }

  return (
    <section ref={moviesListRef} className={styles.moviesList}>
      <h2 className={styles.title}>Popular movies</h2>
      <div className={styles.moviesContainer}>{content}</div>
      <Pagination
        page={page}
        totalPages={total_pages}
        handlePageDecrease={handlePageDecrease}
        handlePageIncrease={handlePageIncrease}
      />
    </section>
  );
};

export default MoviesListPage;
