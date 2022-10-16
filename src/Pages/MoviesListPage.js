import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { apiKey } from "../constants";
import useAxios from "../hooks/useAxios";
import usePagination from "../hooks/usePagination";
import styles from "./MoviesListPage.module.css";

const MoviesListPage = () => {
  const moviesListRef = useRef();

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const {
    data: { results: movies },
    error: moviesError,
    loading: moviesLoading,
    fetchData,
  } = useAxios();

  const maxPage = 500;

  const {
    handleFirstPageClick,
    handleLastPageClick,
    handlePageDecrease,
    handlePageIncrease,
  } = usePagination(page, maxPage, moviesListRef);

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
      <div className="container">
        <h2 className={styles.title}>Popular movies</h2>
        <div className={styles.moviesContainer}>{content}</div>
        <Pagination
          page={page}
          maxPage={maxPage}
          handlePageDecrease={handlePageDecrease}
          handlePageIncrease={handlePageIncrease}
          handleLastPageClick={handleLastPageClick}
          handleFirstPageClick={handleFirstPageClick}
        />
      </div>
    </section>
  );
};

export default MoviesListPage;
