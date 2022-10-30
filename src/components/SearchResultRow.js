import { useNavigate } from "react-router-dom";
import styles from "./SearchResultRow.module.css";

const SearchResultRow = ({ result }) => {
  const navigate = useNavigate();
  const { id, title, poster_path } = result;

  const handleSearchResultClick = () => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className={styles.searchResultRow} onClick={handleSearchResultClick}>
      {poster_path ? (
        <img
          className={styles.image}
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={title}
        />
      ) : (
        <img
          className={styles.image}
          src="https://via.placeholder.com/50"
          alt={title}
        />
      )}
      <p>{title}</p>
    </div>
  );
};

export default SearchResultRow;
