import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import styles from "../css/Card.module.css";

const getTextSnippet = (html, length) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = DOMPurify.sanitize(html);
  return tempDiv.textContent.slice(0, length) + "...";
};

const CollegeClubs = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("http://localhost:5000/card-details");
        if (!response.ok) throw new Error("Failed to fetch card details");
        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCards();
  }, []);

  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.clubsContainer}>
      <h2 className={styles.clubsTitle}>Explore College Clubs</h2>

      <h3 className={styles.categoryTitle}>Technical Clubs</h3>
      <div className={styles.clubsGrid}>
        {cards.map((club) =>
          club.nature.trim().toLowerCase() === "technical" ? (
            <Link to={`/club/${club.id}`} key={club.id}>
              <div
                className={styles.clubCard}
                style={{ backgroundColor: "#E74C3C" }}>
                <div className={styles.clubOverlay}></div>
                <img
                  src={club.picture}
                  alt={club.club_name}
                  className={styles.clubImage}
                />
                <div className={styles.clubInfo}>
                  <h3>{club.club_name}</h3>
                  <p>{getTextSnippet(club.club_info, 30)}</p>
                </div>
              </div>
            </Link>
          ) : null
        )}
      </div>

      <h3 className={styles.categoryTitle}>Non-Technical Clubs</h3>
      <div className={styles.clubsGrid}>
        {cards.map((club) =>
          club.nature.trim().toLowerCase() === "non technical" ? (
            <Link to={`/club/${club.id}`} key={club.id}>
              <div
                className={styles.clubCard}
                style={{ background: club.color }}>
                <div className={styles.clubOverlay}></div>
                <img
                  src={club.picture}
                  alt={club.club_name}
                  className={styles.clubImage}
                />
                <div className={styles.clubInfo}>
                  <h3>{club.club_name}</h3>
                  <p>{getTextSnippet(club.club_info, 30)}</p>
                </div>
              </div>
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
};

export default CollegeClubs;
