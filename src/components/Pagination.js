import { motion } from "framer-motion";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./Pagination.module.css";

const Pagination = ({
  page,
  maxPage,
  handlePageDecrease,
  handlePageIncrease,
  handleLastPageClick,
  handleFirstPageClick,
}) => {
  return (
    <div className={styles.pagination}>
      {page > 2 && (
        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{ scale: 0.9 }}
          className={styles.firstPageButton}
          onClick={handleFirstPageClick}
        >
          <HiChevronDoubleLeft />
        </motion.button>
      )}

      {page > 1 && (
        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{ scale: 0.9 }}
          className={styles.prevButton}
          onClick={handlePageDecrease}
        >
          <IoIosArrowBack />
        </motion.button>
      )}

      <span className={styles.page}>{page}</span>

      {page < maxPage && (
        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{ scale: 0.9 }}
          className={styles.nextButton}
          onClick={handlePageIncrease}
        >
          <IoIosArrowForward />
        </motion.button>
      )}

      {page < maxPage && (
        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLastPageClick}
          className={styles.lastPageButton}
        >
          <HiChevronDoubleRight />
        </motion.button>
      )}
    </div>
  );
};

export default Pagination;
