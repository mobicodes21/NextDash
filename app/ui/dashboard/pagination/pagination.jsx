import styles from "./pagination.module.css";
/* Pagination component */
const Pagination = ({ page, totalPages, onPrev, onNext }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onPrev} disabled={page === 1}>
        Previous
      </button>
      <button
        className={styles.button}
        onClick={onNext}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
