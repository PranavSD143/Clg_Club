import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/search-field.module.css";

export default function Search() {
  const [initial_search, new_search] = useState("");
  const [results, fetchResults] = useState([]);
  const [dropdown, changeDropDown] = useState(false);
  const navigate = useNavigate();
  const dropDownRef = useRef(null);
  async function handleSelect(event) {
    new_search(event.target.value); //Search functionality pending
    if (!event.target.value.trim()) {
      fetchResults([]);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/search-results/${event.target.value}`
      );
      const data = await response.json();
      console.log(data);
      if (response.ok && data.length > 0) {
        fetchResults(data);
        changeDropDown(true);
        return;
      } else {
        fetchResults([]);
        changeDropDown(false);
        return;
      }
      throw new Error("Failed to fetch details");
    } catch (error) {
      console.log("Error occured:" + error);
    }
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        changeDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectResult(clubId) {
    navigate(`/club/${clubId}`);
    new_search("");
    changeDropDown(false);
    fetchResults([]);
  }

  return (
    <div className={styles.searchContainer} ref={dropDownRef}>
      <input
        type="text"
        placeholder="Search clubs or events..."
        className={styles.searchField}
        value={initial_search}
        style={{ color: "black" }}
        onChange={handleSelect}
      />

      {dropdown && results.length > 0 && (
        <ul className={styles.searchDropdown}>
          {results.map((club) => (
            <li
              key={club.id}
              onClick={() => handleSelectResult(club.id)}
              className={styles.searchResult}>
              {club.club_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
