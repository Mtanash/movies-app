import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./Pagination.module.css";

const Pagination = ({
  page,
  totalPages,
  handlePageDecrease,
  handlePageIncrease,
}) => {
  return (
    <div className={styles.pagination}>
      {page > 1 && (
        <button className={styles.prevButton} onClick={handlePageDecrease}>
          <IoIosArrowBack />
        </button>
      )}

      <span className={styles.page}>{page}</span>
      {page < totalPages && (
        <button className={styles.nextButton} onClick={handlePageIncrease}>
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
};

export default Pagination;
