import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <Link to="/">
          <p className={styles.logo}>Movies App</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
