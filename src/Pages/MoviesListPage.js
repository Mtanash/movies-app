import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { apiKey } from "../constants";
import {
  retrieveFromLocalStorage,
  saveToLocalStorage,
} from "../helpers/localStorage";
import useAxios from "../hooks/useAxios";
import usePagination from "../hooks/usePagination";
import styles from "./MoviesListPage.module.css";

const tabs = [
  { title: "Popular", url: "popular" },
  { title: "Upcoming", url: "upcoming" },
  { title: "Top Rated", url: "top_rated" },
];

const MoviesListPage = () => {
  const moviesListRef = useRef();

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [selectedTab, setSelectedTab] = useState(
    retrieveFromLocalStorage("selectedTab", tabs[0])
  );

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    saveToLocalStorage("selectedTab", tab);
  };

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
      `/movie/${selectedTab.url
        .toLowerCase()
        .trim()}?api_key=${apiKey}&language=en-US&page=${page}`,
      controller.signal,
      mounted
    );

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [fetchData, page, selectedTab]);

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
        <div className={styles.moviesListHeader}>
          <h2 className={styles.title}>Discover movies</h2>
          <div className={styles.tabs}>
            {tabs.map((tab, index) => (
              <motion.p
                key={index}
                whileHover={{
                  translateY: "-2px",
                }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.tab} ${
                  selectedTab.title === tab.title && styles.selected
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.title}
              </motion.p>
            ))}
          </div>
          <SearchBar />
        </div>
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
