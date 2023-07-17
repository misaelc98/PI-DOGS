import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreed } from "../../redux/actions";
import style from "./SearchBar.module.css";

export default function SearchBar({ handleSearch }) {
  const dispatch = useDispatch();
  const [searchDog, setSearchDog] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setSearchDog(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getBreed(searchDog));
    handleSearch(searchDog);
  };

  return (
    <div className={style.container}>
      <input
        className={style.input}
        type="text"
        onChange={handleInput}
        placeholder="Search..."
      />
      <button type="submit" onClick={handleSubmit} className={style.button}>SEARCH</button>
    </div>
  );
}
