import React, { useState, useEffect } from "react";
import "../css/Announcement.css";

const Card = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [cards, setCards] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("/achievements");
        if (!response.ok) {
          throw new Error("Failed to fetch card details");
        }
        const data = await response.json();
        setCards(data); // Assume data is an array of card objects
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCards();
  }, []); // Empty dependency array ensures this runs only once

  const handleClick = (id) => {
    setActiveCard(id); // Set the clicked card as active
  };

  const handleClose = () => {
    setActiveCard(null); // Reset to no active card
  };

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetch fails
  }

  return (
    <div className="achievements-container">
      {cards.map(({ club_name, picture, info, cardId }) => (
        <div
          key={cardId}
          className={`achv-card ${activeCard === cardId ? "active" : ""}`}
          onClick={() => handleClick(cardId)}>
          <img src={picture} alt="Poster image" />
          <p>{info}</p>
        </div>
      ))}
      {activeCard !== null && (
        <div className="overlay" onClick={handleClose}></div>
      )}
    </div>
  );
};

export default Card;
