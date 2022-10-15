import { AiFillStar } from "react-icons/ai";
import roundToOneDecimal from "../helpers/roundToOneDecimal";
import styles from "./Rate.module.css";

const Rate = ({ voteAverage, className }) => {
  return (
    <div className={className}>
      <AiFillStar className={styles.rateIcon} />
      {roundToOneDecimal(voteAverage)}
    </div>
  );
};

export default Rate;
