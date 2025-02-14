import React, { useState, useEffect } from "react";
import "../css/Card.css";

const Card = () => {
  const [activeCard, setActiveCard] = useState(null);
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

  const handleClick = (id) => setActiveCard(id);
  const handleClose = () => setActiveCard(null);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card-container">
      {cards.map(
        ({
          club_name,
          catchy_phrase,
          president,
          vice_president,
          cardId,
          club_info,
          picture,
        }) => {
          const isActive = activeCard === cardId;

          return (
            <div key={cardId} className={`card ${isActive ? "active" : ""}`}>
              <header
                className={`card-header ${isActive ? "visible" : "invisible"}`}>
                <div className="club-name">{club_name}</div>
                <img src={picture} alt="Poster image" />
              </header>
              <p className={isActive ? "visible" : "invisible"}>
                {catchy_phrase}
              </p>
              <p className={`heads ${isActive ? "visible" : "invisible"}`}>
                {president}
              </p>
              <p className={`heads ${isActive ? "visible" : "invisible"}`}>
                {vice_president}
              </p>
              <div className={`club-info ${isActive ? "info-active" : ""}`}>
                {isActive ? club_info : `${club_info.slice(0, 50)}...`}
              </div>
              {!isActive && (
                <button onClick={() => handleClick(cardId)}>Read More</button>
              )}
            </div>
          );
        }
      )}
      {activeCard !== null && (
        <div className="overlay" onClick={handleClose}></div>
      )}
    </div>
  );
};

export default Card;
