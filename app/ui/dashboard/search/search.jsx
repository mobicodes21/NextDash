import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
/* search component */
const Search = ({ placeholder, onChange }) => {
  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
export default Search;
