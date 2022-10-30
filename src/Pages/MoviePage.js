import moment from "moment";
import { useEffect } from "react";
import { BiTime } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Vote from "../components/Vote";
import { apiKey } from "../constants";
import { toHoursAndMinutes } from "../helpers/timeConvert";
import useAxios from "../hooks/useAxios";
import styles from "./MoviePage.module.css";

const MoviePage = () => {
  const { movieId } = useParams();

  const {
    data: {
      poster_path,
      title,
      overview,
      genres,
      release_date,
      homepage,
      runtime,
      vote_average,
      vote_count,
    },
    error: movieError,
    loading: movieLoading,
    fetchData,
  } = useAxios();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    fetchData(
      `/movie/${movieId}?api_key=${apiKey}&language=en-US`,
      controller.signal,
      mounted
    );

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [fetchData, movieId]);

  if (movieLoading || !title) return <Loading fullHeight />;
  else if (movieError) return <Error />;
  else
    return (
      <section className={`container ${styles.moviePage}`}>
        <div className={styles.wrapper}>
          <img
            className={styles.image}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
          <div className={styles.details}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.rateWrapper}>
              <Vote
                full
                voteAverage={vote_average}
                className={styles.vote}
                voteCount={vote_count}
              />
              <p className={styles.runtime}>
                {toHoursAndMinutes(runtime)} <BiTime />
              </p>
              <p className={styles.date}>
                {moment(release_date).format("YYYY")}
              </p>
            </div>
            <p className={styles.overview}>{overview}</p>

            <div className={styles.genresWrapper}>
              <p>Genres</p>
              <div className={styles.genres}>
                {genres?.map((genre) => {
                  const { id, name } = genre;
                  return (
                    <div className={styles.genre} key={id}>
                      {name}
                    </div>
                  );
                })}
              </div>
            </div>

            <a
              className={styles.watch}
              href={homepage}
              target="_blank"
              rel="noreferrer"
            >
              Watch
              <BsFillPlayFill className={styles.watchIcon} />
            </a>
          </div>
        </div>
      </section>
    );
};

export default MoviePage;
