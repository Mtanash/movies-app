import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={styles.homePage}>
      <div className={`container ${styles.homePageWrapper}`}>
        <h1 className={styles.header}>Best Movies To Watch</h1>
        <Link className={styles.link} to="/movies?page=1">
          Browse Movies
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
