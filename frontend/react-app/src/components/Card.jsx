import React, { useState } from "react";
import "../css/Card.css";

const Card = ({ id, content }) => {
  const [activeCard, setActiveCard] = useState(null);

  const handleClick = (id) => {
    setActiveCard(id); // Set the clicked card as active
  };

  const handleClose = () => {
    setActiveCard(null); // Reset to no active card
  };

  return (
    <div className="card-container">
      {[1, 2, 3].map((cardId) => (
        <div
          key={cardId}
          className={`card ${activeCard === cardId ? "active" : ""}`}
          onClick={() => handleClick(cardId)}>
          {content}
        </div>
      ))}
      {activeCard !== null && (
        <div className="overlay" onClick={handleClose}></div>
      )}
    </div>
  );
};

export default Card;
