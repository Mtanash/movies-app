import spinner from "../images/laoding-spinner.svg";
import styles from "./Loading.module.css";

const Loading = ({ className, fullHeight }) => {
  return (
    <section className={`${className} ${fullHeight && styles.fullHeight}`}>
      <img src={spinner} alt="loading" />
    </section>
  );
};

export default Loading;
