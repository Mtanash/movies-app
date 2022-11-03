import styles from "./Button.module.css";
import Spinner from "./Spinner";

const Button = ({
  text,
  onClick,
  color = "primary",
  shadow = "medium",
  loading,
}) => {
  return (
    <button
      className={`${styles.button} ${color === "primary" && styles.primary} ${
        shadow === "medium" && styles.mediumShadow
      } ${shadow === "light" && styles.lightShadow}`}
      onClick={onClick}
    >
      {loading ? <Spinner /> : text}
    </button>
  );
};

export default Button;
