import { motion } from "framer-motion";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import truncateString from "../helpers/truncateString";
import styles from "./MovieCard.module.css";
import Vote from "./Vote";

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      variants={{
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      key={id}
      className={styles.movieCard}
    >
      <Link to={`/movies/${id}`}>
        <div className={styles.imageContainer}>
          <img
            className={styles.movieImage}
            src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
            alt={title}
          />
          <Vote voteAverage={vote_average} className={styles.vote} />
          <p className={styles.movieDate}>
            {moment(release_date).format("YYYY")}
          </p>
        </div>
      </Link>

      <h3 className={styles.movieTitle}>{truncateString(title, 30)}</h3>
    </motion.div>
  );
};

export default MovieCard;
