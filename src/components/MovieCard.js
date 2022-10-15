import moment from "moment/moment";
import { Link } from "react-router-dom";
import truncateString from "../helpers/truncateString";
import styles from "./MovieCard.module.css";
import Rate from "./Rate";

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;
  return (
    <div key={id} className={styles.movieCard}>
      <Link to={`/movies/${id}`}>
        <div className={styles.imageContainer}>
          <img
            className={styles.movieImage}
            src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
            alt={title}
          />
          <Rate voteAverage={vote_average} className={styles.vote} />
          <p className={styles.movieDate}>
            {moment(release_date).format("YYYY")}
          </p>
        </div>
      </Link>

      <h3 className={styles.movieTitle}>{truncateString(title, 30)}</h3>
    </div>
  );
};

export default MovieCard;
