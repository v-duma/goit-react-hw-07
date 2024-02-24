import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "/src/redux/filtersSlice.js";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className={css.search_div}>
      <label>Find contacts by name</label>

      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        className={css.search_input}
      />
    </div>
  );
};
