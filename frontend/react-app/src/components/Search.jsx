import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/search-field.css";

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
      const response = await fetch(`/search-results/${event.target.value}`);
      const data = await response.json();
      if (response.ok) fetchResults(data.length > 0 ? data : []);
      else throw new Error("Failed to fetch details");
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
    <div className="search-container" ref={dropDownRef}>
      <input
        type="text"
        placeholder="Search clubs or events..."
        className="search-field"
        value={initial_search}
        style={{ color: "black" }}
        onChange={handleSelect}
      />

      {dropdown && results.length > 0 && (
        <ul className="search-dropdown">
          {results.map((club) => (
            <li
              key={club.id}
              onClick={() => handleSelectResult(club.id)}
              className="search-result">
              {club.club_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
