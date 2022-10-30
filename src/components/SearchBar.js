import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import useAxios from "../hooks/useAxios";
import Error from "./Error";
import Loading from "./Loading";
import styles from "./SearchBar.module.css";
import SearchResultRow from "./SearchResultRow";

const SearchBar = () => {
  const searchBoxRef = useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [SearchResultBoxVisible, setSearchResultBoxVisible] = useState(false);

  const {
    data: searchResults,
    error: searchResultsError,
    loading: searchResultsLoading,
    fetchData: fetchSearchResults,
  } = useAxios();

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const showResultBox = () => {
    setSearchResultBoxVisible(true);
  };

  useEffect(() => {
    if (!SearchResultBoxVisible) return;

    const handleCloseSearchBarOnClickAway = (e) => {
      if (e.target !== searchBoxRef.current) {
        // close search bar
        setSearchResultBoxVisible(false);
      }
    };

    document.addEventListener("click", handleCloseSearchBarOnClickAway);

    return () => {
      document.removeEventListener("click", handleCloseSearchBarOnClickAway);
    };
  });

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    if (!searchQuery) return;
    fetchSearchResults(
      `/search/movie?api_key=a3e6782e8240e1824e43b277ead07d3a&language=en-US&query=${searchQuery}&page=1&include_adult=false`,
      controller.signal,
      mounted
    );

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [fetchSearchResults, searchQuery]);

  let searchResultContent;

  if (searchResultsLoading) {
    searchResultContent = <Loading />;
  } else if (searchResultsError) {
    searchResultContent = <Error />;
  } else if (searchResults?.results?.length === 0) {
    searchResultContent = (
      <div className={styles.empty}>
        <p>No match found</p>
      </div>
    );
  } else {
    searchResultContent = searchResults?.results?.map((result) => (
      <SearchResultRow key={result.id} result={result} />
    ));
  }

  return (
    <div className={styles.searchBar}>
      <label htmlFor="search">
        <BsSearch />
      </label>
      <input
        ref={searchBoxRef}
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onClick={showResultBox}
        className={styles.input}
        id="search"
        type="search"
        placeholder="Search"
      />
      {SearchResultBoxVisible && (
        <div className={styles.result}>{searchResultContent}</div>
      )}
    </div>
  );
};

export default SearchBar;
