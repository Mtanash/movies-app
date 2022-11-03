import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser, setUser } from "../features/auth/authSlice";
import Avatar from "./Avatar";
import Button from "./Button";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectUser);
  const userLoggedIn = Boolean(currentUser);

  const handleAuthClick = () => {
    if (!userLoggedIn) {
      return navigate("/auth");
    }

    // logout user
    dispatch(setUser({}));
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/">
          <p className={styles.logo}>Movies App</p>
        </Link>
        <div className={styles.buttons}>
          <Avatar user={currentUser} />
          <Button
            text={userLoggedIn ? "Logout" : "Login"}
            onClick={handleAuthClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
