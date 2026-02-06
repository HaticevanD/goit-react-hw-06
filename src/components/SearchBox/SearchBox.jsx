import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";

function SearchBox() {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectNameFilter);
  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.searchBox}>
      <label htmlFor="search" className={css.label}>
        Find contacts by name
      </label>
      <input
        id="search"
        type="text"
        value={filterValue}
        onChange={handleChange}
        placeholder="Search..."
        className={css.input}
      />
    </div>
  );
}
export default SearchBox;
