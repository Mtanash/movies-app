import { AiFillStar } from "react-icons/ai";
import kFormatter from "../helpers/Kformatter";
import roundToOneDecimal from "../helpers/roundToOneDecimal";
import styles from "./Vote.module.css";

const Vote = ({ voteAverage, className, full = false, voteCount }) => {
  return (
    <div className={className}>
      <AiFillStar className={styles.rateIcon} />
      {roundToOneDecimal(voteAverage)}
      {full && (
        <p className={styles.rateFraction}>
          /10 {voteCount && `- ${kFormatter(voteCount)}`}
        </p>
      )}
    </div>
  );
};

export default Vote;
