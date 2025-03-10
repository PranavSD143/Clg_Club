import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import "../css/Card.css";

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
        const response = await fetch("/card-details");
        if (!response.ok) throw new Error("Failed to fetch card details");
        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCards();
  }, []);

  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="clubs-container">
      <h2 className="clubs-title">Explore College Clubs</h2>

      <h3 className="category-title">Technical Clubs</h3>
      <div className="clubs-grid">
        {cards.map((club) =>
          club.nature.trim().toLowerCase() === "technical" ? (
            <Link to={`/club/${club.id}`} key={club.id}>
              <div className="club-card" style={{ backgroundColor: "#E74C3C" }}>
                <div className="club-overlay"></div>
                <img
                  src={club.picture}
                  alt={club.club_name}
                  className="club-image"
                />
                <div className="club-info">
                  <h3>{club.club_name}</h3>
                  <p>{getTextSnippet(club.club_info, 30)}</p>
                </div>
              </div>
            </Link>
          ) : null
        )}
      </div>

      <h3 className="category-title">Non-Technical Clubs</h3>
      <div className="clubs-grid">
        {cards.map((club) =>
          club.nature.trim().toLowerCase() === "non technical" ? (
            <Link to={`/club/${club.id}`} key={club.id}>
              <div className="club-card" style={{ background: club.color }}>
                <div className="club-overlay"></div>
                <img
                  src={club.picture}
                  alt={club.club_name}
                  className="club-image"
                />
                <div className="club-info">
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
